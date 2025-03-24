<script setup lang="ts">
 import { RotateCcw } from 'lucide-vue-next';
 import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
 } from '@/components/ui/hover-card'

 const emit = defineEmits(['restartGame']);
 useEventListener('keyup', (event) => {
   if (event.key === 'r') {
      emit('restartGame');
   }
 })
</script>

<template>
  <shadButton id="restartButton" @click="$emit('restartGame')" variant="outline">
    <HoverCard>
      <HoverCardTrigger><RotateCcw id="rotateIcon" class="size-8" /></HoverCardTrigger>
      <HoverCardContent>
        Tip: Game can be restarted by pressing 'R' key
      </HoverCardContent>
    </HoverCard>
  </shadButton>
</template>

<style scoped>
  #restartButton:hover #rotateIcon {
    transform: rotate(-270deg);
  }

  #rotateIcon {
    transition: transform 0.3s;
  }
</style>