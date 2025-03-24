<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {selectOptions} from "~/types/utils";


const props = defineProps({
  selectItems: {type: Array as PropType<selectOptions[]>, required: true},
  placeholder: {type: String, required: false, default: 'Select an option'},
})
const model = defineModel<Number>();
</script>


<template>
  <shad-label :for="placeholder">{{ placeholder }}</shad-label>
  <Select v-model="model" :id="placeholder">
    <SelectTrigger>
      <SelectValue class="text-primary" :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Difficulty</SelectLabel>
        <SelectItem class="" v-for="item in selectItems" :value="item.value" :key="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>