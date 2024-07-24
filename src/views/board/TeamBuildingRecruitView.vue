<template>
  <div class="d-flex justify-content-center mt-5 mx-5">
    <FilterDropdown class="mx-2" /> <FilterInput class="mx-2" />    
  </div>  

  <div class="itemList">
    <b-container>
      <b-row>
        <b-col 
          v-for="item in list" 
          :key="item.id"
          cols="12"
          md="4"
          class="my-3"
          >
          <RecruitItem :item="item" />
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row class="text-center">
        <b-col>
          <b-button variant="success" class="btn-new-post">New Post</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-pagination
        v-model="curPage"
       :total-rows="totRows"      
       :per-page="perPage"
        align="center"
        class="mt-5"
    />
  </div>
</template>
<script setup>
  import {ref, computed} from 'vue'
  import FilterDropdown from '../../components/board/BoardFilterDropdown.vue';
  import FilterInput from '../../components/board/BoardFilterInput.vue'
  import RecruitItem from '../../components/board/BoardRecruitItem.vue'

  const curPage = ref(1)
  const perPage = ref(6)

  // TODO: request data
  // dummy data 
  const data = ref([
    { id: 1, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 2, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 3, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 4, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 5, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 6, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 7, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 8, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 9, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 10, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 11, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 12, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
    { id: 13, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
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
