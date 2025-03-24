<script setup lang="ts">
  import {Difficulty, FieldSize} from "~/types/enums";
  import { Game } from "~/types/game";
  const restarter = ref(false);
  const game = computed(() => {return new Game(Difficulty.Easy, FieldSize.Medium, restarter)});
</script>

<template>
  {{ game.initialized }}
</template>

<style scoped>

</style>