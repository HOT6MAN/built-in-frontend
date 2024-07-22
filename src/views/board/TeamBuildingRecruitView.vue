<template>
  <div class="d-flex justify-content-end m-5">
    <FilterDropdown class="mx-2" /> <FilterInput class="mx-2" />    
  </div>  

  <div class="itemList">
    <div v-for="item in list" :key="item.id">
      <RecruitItem :item="item" />
    </div>
  </div>
  <b-pagination
      v-model="curPage"
     :total-rows="totRows"      
     :per-page="perPage"
  />
</template>
<script setup>
  import {ref, computed} from 'vue'
  import FilterDropdown from '../../components/board/BoardFilterDropdown.vue';
  import FilterInput from '../../components/board/BoardFilterInput.vue'
  import RecruitItem from '../../components/board/BoardRecruitItem.vue'

  const curPage = ref(1)
  const perPage = ref(5)

  // TODO: request data
  // dummy data 
  const data = ref([
    { id: 1, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 2, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 3, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 4, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 5, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 6, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 7, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 8, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 9, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 10, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 11, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 12, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
    { id: 13, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"]},
  ])

  const list = computed(() => {
    const start = (curPage.value - 1) * perPage.value;
    const end = curPage.value * perPage.value;
    return data.value.slice(start, end)
  })

  const totRows = computed(() => data.value.length)
</script>
<style scoped>
  .itemList {
    padding: 20px;
  }
</style>
