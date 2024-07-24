<template>
  <div>       
    <b-card
      :img-src="item.imgUrl"   
      img-alt="Image"
      img-top      
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title tag="h3">
        {{ item.teamName }}
      </b-card-title>

      <b-card-sub-title class="d-flex justify-content-end">
        {{ item.author }}
      </b-card-sub-title>

      <b-card-text>
        <strong>팀 소개: </strong> {{ item.introduction }} <br/>
        <strong>주요 분야: </strong><b-badge variant="info">{{ item.domain }}</b-badge><br/>                 
        <strong>모집 포지션: </strong>
        <b-badge variant="secondary" v-for="pos in item.desiredPositions" :key="pos.id">{{ pos }}</b-badge>
      </b-card-text>

      <b-card-footer class="d-flex justify-content-end">
        <b-button href="#" variant="outline-primary">View</b-button>      
      </b-card-footer>
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