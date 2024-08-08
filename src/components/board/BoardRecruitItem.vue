<template>
  <div>       
    <b-card class="card">
      <b-card-img :src="item.thumbnailUrl" alt="Thumbnail" class="mb-2" height="180px" top />
      <b-card-title tag="h3" class="d-flex justify-content-between align-items-center">
        <span>{{ item.teamName }}</span> 
        <span class="small-text"> <strong>조회: </strong> {{ item.hit }}</span>
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
        <b-button variant="outline-primary" @click.prevent="showDetail">View</b-button>      
      </b-card-footer>
    </b-card>
  </div>
</template>
<script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router'

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })

  const router = useRouter()

  const showDetail = () => {
    router.push({path: '/teambuilding/recruit/' + props.item.id})
  }
</script>
<style scoped>
  .card {
    max-width: 20rem;
  }

  .small-text {
    font-size: 17px;
  }
</style>