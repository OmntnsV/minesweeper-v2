<script setup lang="ts">
import { Flag, LocateFixed } from 'lucide-vue-next';
import { Cell } from '~/types/game';

const props = defineProps({
  cell: {type: Cell, required: true},
});

</script>

<template>
  <div>
    <Flag v-if="cell?.flagged.value && !cell?.revealed.value" class="text-primary"/>
    <LocateFixed v-if="cell?.isMined && cell?.revealed.value" class="text-accent"/>
    <div v-if="cell?.revealed.value && !cell?.isMined">{{ cell?.content.value}}</div>
  </div>
</template>

<style scoped>

</style>