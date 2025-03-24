<script setup lang="ts">
  import { Game } from "~/types/game";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from '@/components/ui/hover-card'

  const props = defineProps({
    gameInstance: {type: Game, required: true},
  });

  useEventListener('keyup', (event) => {
    if (event.key === 'f') {
      props.gameInstance.toggleFlagMode();
    }
  })
</script>

<template>
  <shadButton :variant="gameInstance.flagMode.value ? 'default' : 'outline'" @click="gameInstance.toggleFlagMode()">
    <Hover text="Flag mode" tip="Tip: You can also press F to toggle flag mode or right click the cell to place a flag."/>
  </shadButton>
</template>

<style scoped>

</style>