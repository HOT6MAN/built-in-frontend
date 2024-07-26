<!-- <template>
  <div>

  </div>
</template>

<script lang="ts">
  export default{
    name: 'ErrorBoundary',
    props: {
      fallback: {
        type: Object 
        }
      },
      data() {
        return {
          hasError : false
          };
        },
        errorCaptured(error, compInst, info) {
          this.hasError = true;
          console.log("error : ", error);
          console.log("compInst : ", compInst);
          console.log("info : ", info);
        },
        render(createElement) {
          return this.hasError ? createElement(this.fallback) : this.$slots.default[0];
        }
      };
</script>

<style scoped>

</style> -->