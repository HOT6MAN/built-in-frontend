<template>
  <div>       
    <div class="card" @click.prevent="showDetail">
      <b-card-img :src="item.thumbnailUrl" alt="Thumbnail" class="imgThumbnail" height="180px" top />
       <!-- <img src="" alt="" class="imgThumbnail"> -->
      <b-card-title class="d-flex justify-content-between align-items-center">
        <div class="teamName">{{ item.teamName }}</div>
      </b-card-title>

      <b-card-text class="left-aligned">
        <div class="itemTitle">{{ item.introduction }} <br/></div>
        <div class="itemDomain"><b-badge class="itemBadge" variant="info">{{ item.domain }}</b-badge><br/></div>
        <div class="badges">
        <div v-for="pos in item.desiredPositions" :key="pos.id">
          <b-badge variant="secondary" class= "itemBadge">{{ pos }}</b-badge>
        </div>
        </div>
      </b-card-text>
    </div>
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
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 228.8px;
    height: auto;
    padding: 1px;
    border: 0px;
    font-family: var(--font-roboto);
  }
  .card:hover {
    cursor: pointer;
  }
  .teamName {
    font-size: 14px;
    max-height: 20.01px;
    padding : 0px 5px;
  }
  .imgThumbnail {
    border: 1px solid black;
    max-width: 227.2px;
    max-height: 126.91px;
    margin-bottom: 1rem;
    border-radius: 0%;
    object-fit: cover;
    object-position: center center;
  }
  .itemTitle {
    font-size: 18px;
    height: 40px;
    margin-bottom: 10px;
  }
  .small-text {
    font-size: 17px;
  }
  .itemBadge {
    font-weight: 100;
  }

  .left-aligned {
    text-align: left;
    padding: 0px 5px;
  }
  .itemDomain {
    margin-bottom: 10px;
  }
  .badges {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 5px;
  }
</style>