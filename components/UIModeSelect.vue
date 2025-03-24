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

const colorMode = useColorMode();
const mode = ref('system');
colorMode.preference = mode.value;
watch(mode, () => {
  colorMode.preference = mode.value;
});
</script>


<template>
  <shad-label for="colorMode">Color mode</shad-label>
  <Select id="colorMode" v-model="colorMode.preference">
    <SelectTrigger>
      <SelectValue placeholder="Choose color mode" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Color mode</SelectLabel>
        <SelectItem value="system">
          System
        </SelectItem>
        <SelectItem value="dark">
          Dark
        </SelectItem>
        <SelectItem value="light">
          Light
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>