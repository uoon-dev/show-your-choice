<template>
  <div data-type="show/question">
    <h1>{{ getTitle }}</h1>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import api from '../services/api';

export default {
  data() {
    return {
      title: '',
      questions: []
    }
  },
  created() {
    this.getQuestionItems()
      .then(response => {
        this.questions = response.data.choices;
      })
  },
  computed: {
    getTitle() { 
      if (this.questions && this.questions.length > 0) {
        return this.questions[0].title;
      }
    }
  },
  methods: {
    async getQuestionItems() {
      return await api().get('1e5cf100-b670-11e8-b935-b7809ca142ae');
    }
  }
}
</script>