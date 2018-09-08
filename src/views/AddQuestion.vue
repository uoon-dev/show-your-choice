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
    saveQuestion() {
      console.log(e);
      // const question = {
      //   title: this.titleA,
      //   options: [],
      //   imgs: []
      // };
      // const data = {
      //   choices: [
      //     {
      //       choiceIndex: 0,
      //       title: this.titleA,
      //       options: [
      //         "한달에 한번 보급선 왕복",
      //         "인터넷은 되지만 느림 위성전화 사용 가능",
      //         "집안 청결상태는 어느 정도 유지",
      //         "나머지는 개인시간",
      //         "1년 휴가 한달 가능",
      //         "3년간 고용보장"
      //       ],
      //       imgs: [
      //         "http://cfile272.uf.daum.net/image/2306E94C57EFAD5736C40A"
      //       ]
      //     },
      //     {
      //     choiceIndex: 1,
      //       title: this.titleB,
      //       "options": [],
      //       "imgs": []
      //     }
      //   ],
      //   result: [
      //     123,
      //     456
      //   ]
      // };
    },
    onChangeTitle(title) {
    },
    onChangeOptions(options) {
      console.log(options);
    }
  }
}
</script>
