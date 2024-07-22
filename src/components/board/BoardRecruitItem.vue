<template>
  <div>       
    <b-card
      :title="item.teamName"
      :img-src="item.imgUrl"   
      img-alt="Image"
      img-top
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{ item.introduction }} <br/>
        {{ item.domain }} <br/>                 
        {{ item.desiredPositions.join(', ') }}
      </b-card-text>

      <div class="d-flex justify-content-end">
        <b-button href="#" variant="primary">View</b-button>      
      </div>
    </b-card>
  </div>
</template>
<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
</script>
<style scoped>

</style>