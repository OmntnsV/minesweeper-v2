<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Settings, Eye } from 'lucide-vue-next';
import {Difficulty, FieldSize} from "~/types/enums";
import {useSettingsStore} from "~/stores/settings";
import { Separator } from "~/components/ui/separator";
const settingsStore = useSettingsStore();
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <h1 class="font-bold text-2xl"> minesweeper / v2</h1>
    </SidebarHeader>
    <Separator orientation="horizontal" />
    <SidebarContent>
      <SidebarGroup class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 items-center">
          <Settings class="text-primary size-6" />
          <div class="text-xl font-medium">game settings</div>
        </div>
        <Select
          v-model="settingsStore.difficulty"
          :select-items="[
            {value: Difficulty.Easy, label: 'Easy'},
            {value: Difficulty.Moderate, label: 'Moderate'},
            {value: Difficulty.Hard, label: 'Hard'},
            {value: Difficulty.PureEvil, label: 'Pure Evil'},
          ]"
          placeholder="Difficulty:"
        />
        <Select
            v-model="settingsStore.fieldSize"
            :select-items="[
            {value: FieldSize.Small, label: 'Small'},
            {value: FieldSize.Medium, label: 'Medium'},
            {value: FieldSize.Large, label: 'Large'},
            ]"
            placeholder="Field size:"
        />
        <SettingsAlert />
      </SidebarGroup>
      <Separator orientation="horizontal" />
      <SidebarGroup class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 items-center">
          <Eye class="text-primary size-6" />
          <div class="text-xl font-medium">view settings</div>
        </div>
        <UIModeSelect />
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>