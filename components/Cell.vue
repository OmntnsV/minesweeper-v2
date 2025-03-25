<script setup lang="ts">
  import { Cell } from '~/types/game'
  import {CellContent} from "~/types/enums";

  const props = defineProps({
    cell: {type: Cell, required: true},
  })

  const handleClick = () => {
    props.cell?.handleClick();
  }

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
    class="cell m-1 border border-primary rounded-sm flex justify-center items-center transition select-none aspect-square"
    @click="handleClick"
    @contextmenu.prevent="cell?.handleRightClick()"
  >
    <!-- TODO: Remove listeners from every single cell -->
    <CellDisplayContent :cell="cell" />
  </div>
</template>

<style scoped>
 .cell {
   min-width: 25px;
   box-sizing: content-box;
 }

 .revealed {
   background-color: hsl(var(--primary));
   color: hsl(var(--accent));
 }

 .bombed {
   background-color: red;
 }
</style>