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
        팀 소개: {{ item.introduction }} <br/>
        주요 분야: {{ item.domain }} <br/>                 
        모집 포지션: {{ item.desiredPositions.join(', ') }}

        <hr>
      </b-card-text>

      <div class="d-flex justify-content-end">
        <b-button href="#" variant="outline-primary">View</b-button>      
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