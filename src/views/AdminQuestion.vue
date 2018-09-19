<template>
  <div data-type="add/question">
      <el-form data-type="add/form">
        <legend data-header><h1>질문 등록하기</h1></legend>        
        <el-row>
          <add-question-items v-for="(header, id) in headers" 
            :key="id" 
            :questionID="id" 
            :header="header"
            @updateTitle="onChangeTitle"
            @updateOptions="onChangeOptions"></add-question-items>
        </el-row>
        <p data-save>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-button type="primary" @click="saveQuestion()">등록하기</el-button>
            </el-col>
          </el-row>
        </p>
      </el-form>        
  </div>
</template>
<style lang="scss" scoped>
  [data-type$="question"] {
    padding-bottom: 100px;
    [data-type$="form"] {
      fieldset {
        border: 1px solid gainsboro;

        [data-save] {
          margin-bottom: 0;
        }
      }
    }
  }


</style>
<script>
import api from '../services/api';
import AddQuestionItems from '../components/AddQuestionItems.vue';
export default {
  data() {
    return {
      headers: ['이거랑', '이거'],
      result: {
        choices: []
      }
    }
  },
  components: {
    AddQuestionItems
  },
  methods : {
    increaseQuestion(index) {
      this.questions.push(index);
    },
    async saveQuestion() {
      debugger;
      await api().post('', this.result);
      // this.$router.push('items');
    },
    onChangeTitle(question) {
      this.updateQuestion(question);
    },
    onChangeOptions(question) {
      this.updateQuestion(question);
    },
    updateQuestion(question) {
      // this.result.choices.some((choice) => choice.index !== question.choiceIndex);
      this.result.choices[question.choiceIndex] = question;
    }
  }
}
</script>
