<template>
  <div data-type="add/question">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
      <el-form data-type="add/form">
        <fieldset>
          <legend data-header><h1>질문 등록하기</h1></legend>        
          <p data-save>
            <el-row>
              <el-col :span="5" :offset="19">
                <el-button type="primary" @click="saveQuestion()">등록하기</el-button>
              </el-col>
            </el-row>
          </p>
          <question-list v-for="(question, id) in questions" 
            :key="id" 
            :questionID="id" 
            @updateTitle="onChangeTitle"
            @updateOptions="onChangeOptions"></question-list>
          <p data-increase>
            <el-row>
              <el-col :span="14" :offset="5">
                <el-button type="primary" @click="increaseQuestion(index++)">질문 추가하기</el-button>
              </el-col>
            </el-row>
          </p>
        </fieldset>
      </el-form>        
      </el-col>
    </el-row>
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
import QuestionList from '../components/QuestionList.vue';

export default {
  data() {
    return {
      questions: [0],
      result: {
        choices: []
      }
    }
  },
  components: {
    QuestionList
  },
  created() {
    
  },
  methods : {
    increaseQuestion(index) {
      this.questions.push(index);
    },
    async saveQuestion() {
      await api().put('questions.json', this.result);
      this.$router.push('items');
    },
    onChangeTitle(question) {
      this.updateQuestion(question);
    },
    onChangeOptions(question) {
      this.updateQuestion(question);
    },
    updateQuestion(question) {
      this.result.choices.filter((choice) => choice.index !== question.choiceIndex).push(question);
      this.result.choices[question.choiceIndex] = question;
    }
  }
}
</script>
