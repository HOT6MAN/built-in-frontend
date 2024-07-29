<script setup>

</script>

<template>
    <div class="signUp">
        <h1>회원가입</h1>
        이름: <input type="text">
        이메일: <input type="text">


        <button @click="">가입</button>
        <button>취소</button>


    </div>
</template>

<style scoped>
/* margin-top을 줘 네비게이션 바가 하단 요소를 잡아먹지 않도록 합니다. */
.signUp {
    margin-top : 100px;
}
</style>