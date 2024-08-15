<template>
  <div>
    <b-input-group class="mb-3">            
      <b-form-input v-model="inputVal"></b-form-input>
      <b-input-group-append>
        <b-button text="submit" class="search" variant="primary" @click="deliver">검색</b-button>
      </b-input-group-append>
    </b-input-group>    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:key'])

const inputVal = ref('')

const deliver = () => {
  emit('update:key', inputVal.value)
}
</script>

<style scoped>
  .search{
    font-family: var(--font-roboto);
  font-weight: 700 !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;
  font-size: 16px !important;
  border: none !important;
  background-color: #4299e1 !important;
  color: #ffffff !important;
  transition: background-color 0.3s ease, box-shadow 0.3s ease !important;
  
  }
  .search:hover {
  background-color: #434c5e !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}
</style>