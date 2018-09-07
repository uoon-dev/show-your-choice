<template>
  <div data-type="add/question">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form data-type="add/content">
          <fieldset data-type="add/area">
            <legend data-header><h1>질문 등록하기</h1></legend>
            <p data-title-questions>
              <el-row :gutter="20">
                <el-col :span="14" :offset="5">
                  <el-form-item data-title>
                    <h2>질문</h2>
                    <el-input type="text" v-model="titleA" name="question-title-a" clearable autofocus></el-input>
                      <h2>vs</h2>
                    <el-input type="text" v-model="titleB" name="question-title-b" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </p>
            <p data-answers>
              <el-row :gutter="20">
                <el-col :span="14" :offset="5">
                  <el-form-item data-title>
                    <h2>답변</h2>
                      <el-input
                        type="text" 
                        v-for="(answer, index) in answers" 
                        @keydown.enter.native="enterAndGo"
                        @focus="showButtons"
                        :key="index"
                        :data-index="index"
                        :ref="`answer${index}`"
                        style="margin-bottom: 20px;">
                        <i
                          class="el-icon-error el-input__icon"
                          slot="suffix"
                          @click="showButtons"
                          style="cursor: pointer;">
                        </i>
                        <i
                          class="el-icon-delete el-input__icon"
                          slot="suffix"
                          @click="deleteAnswer"
                          style="cursor: pointer;" :data-delete-index="index" v-if="index === 0 ? false : true">
                        </i>
                      </el-input>
                  </el-form-item>
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
  [data-type^="add"] {
  }

  [data-type$="question"] {
    padding-bottom: 100px;
    [data-title] {}

    [data-type$="content"] {}
  }

  [data-type$="area"] {
    border: 1px solid gainsboro;

    [data-title-questions] {
      input[type="text"] {
        align-self: center;
      }
    }

    [data-answers] {}
  }

</style>
<script>
export default {
  data() {
    return {
      titleA: '',
      titleB: '',
      answers: [0]
    }
  },
  created() {
    
  },
  methods : {
    enterAndGo(e) {
      const input = e.currentTarget;
      let index = parseFloat(input.children[0].dataset.index);
      const next = index + 1;
      const hasNextValue = this.answers.indexOf(next);

      if (hasNextValue >= 0) {
        const nextInput = this.$refs[`answer${next}`][0].$el.children[0]; 
        nextInput.focus();
      } else {
        this.answers.push(next);
        setTimeout(function() {
          // after element is created...
          const nextInput = this.$refs[`answer${next}`][0].$el.children[0]; 
          nextInput.focus();
        }.bind(this), 1000)
      }
    },
    deleteAnswer(e) {
      const icon = e.currentTarget;
      const inputDiv = icon.offsetParent.offsetParent;
      const input = inputDiv.children[0];
      const index = input.dataset.index;
      input.style.display = 'none'

      this.answers.splice(this.answers.indexOf(index), 1);
    }
  }
}
</script>
