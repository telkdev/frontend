<template>
  <div>
    <p>{{ side }}</p>
    <span v-if="props.picks.length === 0">No picks yet</span>

    <ul v-else>
      <li v-for="pick in props.picks" :key="pick">{{ pick }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export type Pick = string;

const props = defineProps<{
  side: "radiant" | "dire";
  picks: Pick[];
}>();
</script>
