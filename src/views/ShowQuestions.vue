<template>
  <div data-type="show/question">
    <show-question-items v-for="(choice, id) in data.choices" :key="id" :question="choice"></show-question-items>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import api from '../services/api';
import ShowQuestionItems from '../components/ShowQuestionItems.vue';

export default {
  data() {
    return {
      title: '',
      data: {
        choices: []
      }
    }
  },
  components: {
    ShowQuestionItems
  },
  created() {
    this.getQuestionItems()
      .then(response => {
        this.data = response.data.data;
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
      return await api().get('70f4e710-1f65-4c17-b26d-be011bc6407d');
    }
  }
}
</script>