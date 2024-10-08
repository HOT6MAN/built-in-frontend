<template>
  <div class="d-flex justify-content-between align-items-center mt-5 mx-5">
    <div class="d-flex justify-content-center w-100">
      <FilterDropdown class="mx-2" @update:key="receiveKey" /> 
      <FilterInput class="mx-2" @update:key="receiveValue" />
    </div>
  </div>
  
  <div class="itemList">
    <b-container v-show="!loading" class="itemContainer">
      <b-row>
        <b-col v-if="isAuth"
        class="createItem"
        md="3">
          <router-link :to="{path: '/teambuilding/recruit/create'}" class="createItemButton">
            <img src="@/icons/createItemButton.svg" alt="" class="createItemImage">
          </router-link>
        </b-col>
        <b-col 
          v-for="item in list" 
          :key="item.id"
          cols="12"
          md="3"
          class="my-1 mx-2.5"
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
    
    <div v-show="loading" class="full-screen-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </div>
</template>
<script setup>
  import {ref, defineProps, defineEmits, watch} from 'vue'
  import { useAuthStore } from '../../stores/authStore';
  import { storeToRefs } from 'pinia';
  import FilterDropdown from '../../components/board/BoardFilterDropdown.vue';
  import FilterInput from '../../components/board/BoardFilterInput.vue'
  import RecruitItem from '../../components/board/BoardRecruitItem.vue'

  const props = defineProps({
    data: {
      type: Array      
    },
    loading: {
      type: Boolean
    }
  })

  const emit = defineEmits({
    update: (key, value) => {
      // TODO: validation check (value null X -> key 반드시 값 존재해야)

      return true;
    }
  })

  const receiveKey = (newValue) => {
    filterKey.value = newValue
  }

  const receiveValue = (newValue) => {
    filterValue.value = newValue

    emit('search', filterKey.value, filterValue.value)
  }

  const authStore = useAuthStore();
  const {userId} = storeToRefs(authStore);

  const curPage = ref(1)
  const perPage = ref(6)
  const list = ref([])
  const totRows = ref(0)
  const filterKey = ref('')
  const filterValue = ref('')
  const isAuth = ref(userId.value)

  const updateList = (data) => {
    const start = (curPage.value - 1) * perPage.value;
    const end = curPage.value * perPage.value;
    list.value = data?.slice(start, end);
    totRows.value = data?.length;
  }

  watch(() => props.data, (fetchedData) => updateList(fetchedData.data), { deep: true, immediate: true})
  watch([curPage, perPage], () => updateList(props.data.data))
</script>
<style scoped>
  .itemList {
    /* padding: 20px; */
  }
  .itemContainer {
    max-width: 963.2px;
  }
  .full-screen-center {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .createItem {
  }
  .createItem:hover {
    cursor: pointer;
  }
  .creteItemButton {
    border: 1px solid black;
  }
  .createItemImage {
    width: 90%;
    height: 90%;
  }
</style>
