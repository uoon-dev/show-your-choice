<template>
  <div class="question">
    <h1>{{ title }}</h1>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  import questions from '../data/questions';
  export default {
    data() {
      return {
        title: ''
      }
    },
    created() {
      debugger;
      this.title = questions[0].title;
      // this.axios.get('./src/data/questions.js').then((response) => {
      //   console.log(response.data)
      // })
    }
  }
</script>