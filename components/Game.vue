<script setup lang="ts">
import { Game } from '~/types/game'
import Cell from "~/components/Cell.vue"
import { useSettingsStore } from "~/stores/settings";
import RestartButton from "~/components/RestartButton.vue";

const settingsStore = useSettingsStore();
const restarter = ref(false);
function restartGame() {
  restarter.value = !restarter.value;
}
const game = computed(() => {return new Game(settingsStore.difficulty, settingsStore.fieldSize, restarter)});

</script>

<template>
  <div class="m-auto flex flex-col justify-center items-center h-dvh relative">
    <div v-if="!game.isGameWon.value" id="field" class="flex flex-col border border-primary rounded-xl p-2 aspect-square">
      <div v-for="cellRow in game.field" :key="cellRow[0].id" class="cell__row flex flex-row justify-between">
        <Cell v-for="cell in cellRow" :key="cell.id" :cell="cell" />
      </div>
    </div>
    <div v-else>Congrats, comrade!</div>
    <div class="flex flex-row justify-between items-center mt-8 gap-8">
      <FlagButton :game-instance="game" />
      <RestartButton @restart-game="restartGame" />
    </div>
  </div>
</template>

<style scoped>
  #field {
    max-height: 85%;

  }
</style>