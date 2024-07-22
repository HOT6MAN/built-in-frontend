<template>
  <div>
    <b-form-select :options="options" class="mb-3">
      <template #first>
        <b-form-select-option disabled> -- 검색 조건 -- </b-form-select-option>
      </template>
    </b-form-select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = ref([
  { text: "팀 이름" },
  { text: "글쓴이" },
  { text: "포지션" }
]);
</script>

<style scoped>
  
</style>