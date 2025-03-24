<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const props = defineProps({
  text: {type: String, required: true},
  tip: {type: String, required: true},
});
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>{{ text }}</HoverCardTrigger>
    <HoverCardContent>
      {{ tip }}
    </HoverCardContent>
  </HoverCard>
</template>