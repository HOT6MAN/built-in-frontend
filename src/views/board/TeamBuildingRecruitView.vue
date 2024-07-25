<template>
  <div class="d-flex justify-content-between align-items-center mt-5 mx-5">
    <div class="d-flex justify-content-center w-100">
      <FilterDropdown class="mx-2" /> 
      <FilterInput class="mx-2" />
    </div>
    <b-button variant="success">New</b-button>
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
      <b-row>
        <b-pagination
            v-model="curPage"
           :total-rows="totRows"      
           :per-page="perPage"
            align="center"
            class="mt-5"
        />
      </b-row>
    </b-container>    
  </div>
</template>
<script setup>
  import {ref, computed, defineProps} from 'vue'
  import FilterDropdown from '../../components/board/BoardFilterDropdown.vue';
  import FilterInput from '../../components/board/BoardFilterInput.vue'
  import RecruitItem from '../../components/board/BoardRecruitItem.vue'

  const props = defineProps({
    data: {
      type: Array      
    }
  })

  const { data } = props;

  const curPage = ref(1)
  const perPage = ref(6)

  const list = computed(() => {
    const start = (curPage.value - 1) * perPage.value;
    const end = curPage.value * perPage.value;
    return data.slice(start, end)
  })

  const totRows = computed(() => data.length)
</script>
<style scoped>
  .itemList {
    padding: 20px;
  }
</style>
