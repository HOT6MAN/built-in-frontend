<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>    
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';

const emit = defineEmits(['update:key'])

const options = ref([
  { text: " -- 선택 조건 --", disabled: true },
  { text: "팀 이름" },
  { text: "글쓴이" },
  { text: "포지션" }
]);

const selected = ref('')

watch(selected, (newValue) => {
  emit('update:key', newValue)
})
</script>

<style scoped>
  
</style>
