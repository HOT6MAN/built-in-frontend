<template>
  <div>
    <b-form-select :options="options" class="mb-3"></b-form-select>    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = ref([
  { text: " -- 선택 조건 --", disabled: true },
  { text: "팀 이름" },
  { text: "글쓴이" },
  { text: "포지션" }
]);
</script>

<style scoped>
  
</style>