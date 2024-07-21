<template>
  <div id="error-page">
    <p class="'text'"> 서비스를 불러오는데 실패했습니다.</p>
    <p class="text">새로고침 버튼을 눌러주세요</p>
    <button class="button" @click='refreshPage()'>새로고침 하기</button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    refreshPage(){
      window.location.reload();
    },
  },
}
</script>

<style scoped>
</style>