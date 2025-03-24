<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <div>
    <SidebarProvider>
      <Sidebar />
      <main class="w-full">
        <SidebarTrigger class="fixed z-10" />
        <NuxtPage />
      </main>
    </SidebarProvider>
  </div>
</template>
