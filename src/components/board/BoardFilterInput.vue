<template>
  <div>
    <b-input-group class="mb-3">            
      <b-form-input v-model="inputVal"></b-form-input>
      <b-input-group-append>
        <b-button text="submit" variant="primary" @click="deliver">submit</b-button>
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
  
</style>