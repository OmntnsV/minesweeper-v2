<script setup lang="ts">
  import { Cell } from '~/types/game'
  import { Flag } from 'lucide-vue-next';
  import {CellContent} from "~/types/enums";

  const props = defineProps({
    cell: {type: Cell, required: true},
  })

  const handleClick = () => {
    props.cell?.handleClick();
  }

  const cellContent = computed(() => {
    const cell = props.cell;
    if (props.cell?.flagged.value) {
      return '🚩';
    }
    if (!cell?.revealed.value) {
      return '';
    }
    const cellState = cell?.content.value;
    switch (cellState) {
      case 0:
        return '';
      case 9:
        return '💣';
      default:
        return cellState;
    }
  })

  const isCellClickable = computed(() => {
    const isRevealed = props.cell?.revealed.value;
    const isFlagged = props.cell?.flagged.value;
    const isFlagMode = props.cell?.hostedGame.flagMode.value;

    if (isFlagged && !isFlagMode) return false;
    if (isFlagMode && !isRevealed) return true;
    return !isRevealed;

  })
</script>

<template>
  <div
    :style="{color: Cell.cellColorDictionary[cell.content.value]}"
    :class="{
      'revealed': cell?.revealed.value && cell?.content.value !== CellContent.Mine,
      'bombed': cell?.isMined && cell?.revealed.value,
      'hover:scale-110 cursor-pointer': isCellClickable,
    }"
    class="content m-1 size-8 border border-primary rounded-sm flex justify-center items-center transition select-none"
    @click="handleClick"
    @contextmenu.prevent="cell?.toggleFlag"
  >
    <span v-if="cellContent !== '🚩'">{{ cellContent }}</span>
    <Flag v-if="cellContent === '🚩'" class="text-primary"/>
  </div>
</template>

<style scoped>
 .content {
   aspect-ratio: 1/1;
 }

 .revealed {
   background-color: hsl(var(--primary));
   color: hsl(var(--accent));
 }

 .bombed {
   background-color: red;
 }
</style>