<template>
  <ul :class="{ disabled: props.disabled }">
    <li v-for="hero in heroes" :key="`pool-${hero}`">
      <button @click="emits('select', hero)">{{ hero }}</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";

const heroes = ref(["Axe", "Bane", "Crystal Maiden", "Dazzle", "Earthshaker"]);

const props = defineProps<{
  disabled: boolean;
}>();

const emits = defineEmits<{
  select: [string];
}>();
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.7;
}
</style>
