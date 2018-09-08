<template>
  <div data-type="add/content">
    <p data-title-questions>
      <el-row :gutter="20">
        <el-col :span="14" :offset="5">
          <el-form-item data-title>
            <h2 :class="{marginOff : this.questionID === 0}">질문</h2>
            <el-input 
              type="text" 
              v-model="title" 
              @keyup.native="updateQuestionTitle"
              clearable 
              autofocus>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </p>
    <p data-options>
      <el-row :gutter="20">
        <el-col :span="10" :offset="7">
          <el-form-item data-title>
            <h2 @click="showOptions">옵션</h2>
              <el-input
                type="text" 
                v-for="(option, index) in optionCount" 
                v-model="optionContent[index]"
                @keyup.native="updateOptionContent(index)"
                @keydown.enter.native="enterAndGo"
                :key="index"
                :data-index="index"
                style="margin-bottom: 10px;"
                :ref="`option-${questionID}-${index}`">
                <i
                  class="el-icon-error el-input__icon"
                  slot="suffix"
                  style="cursor: pointer;">
                </i>
                <i
                  class="el-icon-delete el-input__icon"
                  slot="suffix"
                  style="cursor: pointer;"
                  v-if="index === 0 ? false : true"
                  @click="deleteAnswer">
                </i>
              </el-input>
          </el-form-item>
        </el-col>
      </el-row>              
    </p>
    <hr class="border-gray"/>
  </div>
</template>
<style lang="scss" scoped>
  .marginOff {
    margin-top: -4px;
  }

  [data-title-questions] {
    margin-top: 0;
    margin-bottom: -15px;
  }

  .border-gray {
    border: 1px solid gainsboro;
  }
</style>
<script>
export default {
  props: {
    questionID: {
      type: Number
    }
  },
  data() {
    return {
      title: '',
      options: {},
      optionCount: [0],
      optionContent: {}
    }
  },
  methods : {
    enterAndGo(e) {
      const input = e.currentTarget;
      const index = parseFloat(input.children[0].dataset.index);
      const next = parseFloat(index) + 1;
      const hasNextValue = this.optionCount.indexOf(next);

      if (hasNextValue >= 0) {
        const nextInput = this.$refs[`option-${this.questionID}-${next}`][0].$el.children[0]; 
        nextInput.focus();
      } else {
        this.optionCount.push(next);
        setTimeout(function() {
          // after element is created...
          const nextInput = this.$refs[`option-${this.questionID}-${next}`][0].$el.children[0]; 
          nextInput.focus();
        }.bind(this), 100)
      }
    },    
    deleteAnswer(e) {
      const icon = e.currentTarget;
      const inputDiv = icon.offsetParent.offsetParent;
      const input = inputDiv.children[0];
      const index = input.dataset.index;
      inputDiv.style.display = 'none'
      delete this.optionCount[index];
    },
    saveTitle() {
      this.$store.dispatch('setTitle', this.title);
      debugger;
    },
    updateQuestionTitle() {
      this.$emit('updateTitle', this.title);
    },
    updateOptionContent(index) {
      // console.log(this.optionContent, index)
      this.options[index] = this.optionContent[index];
      this.$emit('updateOptions', this.options);
    },
    showOptions() {
      debugger;
    }
   }
}
</script>
