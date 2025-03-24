<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import {Difficulty, FieldSize} from "~/types/enums";
import {useSettingsStore} from "~/stores/settings";
const settingsStore = useSettingsStore();
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <h1 class="font-bold text-2xl"> minesweeper / v2</h1>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup class="flex flex-col gap-4">
        <div class="text-xl font-medium">game settings</div>
        <Select
          :select-items="[
            {value: Difficulty.Easy, label: 'Easy'},
            {value: Difficulty.Moderate, label: 'Moderate'},
            {value: Difficulty.Hard, label: 'Hard'},
            {value: Difficulty.PureEvil, label: 'Pure Evil'},
          ]"
          placeholder="Difficulty:"
          v-model="settingsStore.difficulty"
        />
        <Select
            :select-items="[
            {value: FieldSize.Small, label: 'Small'},
            {value: FieldSize.Medium, label: 'Medium'},
            {value: FieldSize.Large, label: 'Large'},
            ]"
            placeholder="Field size:"
            v-model="settingsStore.fieldSize"
        />
        <SettingsAlert />
      </SidebarGroup>
      <SidebarGroup class="flex flex-col gap-4">
        <div class="text-xl font-medium">view settings</div>
        <UIModeSelect />
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>