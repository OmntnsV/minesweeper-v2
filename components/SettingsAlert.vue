<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ShieldAlert } from 'lucide-vue-next';
</script>

<template>
  <Alert variant="destructive">
    <ShieldAlert class="w-4 h-4" />
    <AlertTitle class="font-semibold">Attention, soldier!</AlertTitle>
    <AlertDescription>
      Game will be restarted if settings are changed
    </AlertDescription>
  </Alert>
</template>