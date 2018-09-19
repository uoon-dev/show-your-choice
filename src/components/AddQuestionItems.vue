<template>
  <span data-type="add/content">
    <el-col :span="10" :offset="1">
      <p data-title-questions>
        <el-row :gutter="20">
          <el-col :span="16" :offset="5">
            <el-form-item data-title>
              <h2>{{ header }}</h2>
              <el-input 
                type="text" 
                v-model="question.title" 
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
          <el-col :span="12" :offset="7">
            <el-form-item data-title>
              <h3>+ 옵션</h3>
                <el-input
                  type="text" 
                  v-for="(option, index) in optionData.options" 
                  v-model="option.text"
                  @keydown.enter.native="enterAndGo"
                  @keyup.native="updateOptionContent(option, index)"
                  :class="{rightPadding: index !== 0}"
                  :key="index"
                  :data-index="index"
                  style="margin-bottom: 10px;">
                  <i
                    class="el-icon-error el-input__icon"
                    slot="suffix"
                    style="cursor: pointer;"
                    @click="clearText($event, option)">
                  </i>
                  <i
                    class="el-icon-delete el-input__icon"
                    slot="suffix"
                    style="cursor: pointer;"
                    v-if="index === 0 ? false : true"
                    @click="deleteOption(option)">
                  </i>
                  <template slot="append" v-if="showAddButton(option)">
                    <el-button type="primary" icon="el-icon-circle-plus" circle @click="enterAndGo"></el-button>
                  </template>
                </el-input>                
            </el-form-item>
          </el-col>
        </el-row>              
      </p>
    </el-col>
    <el-col :span="1" v-if="this.questionID === 0">
      <p data-versus><strong>VS</strong></p>
    </el-col>
  </span>
</template>
<style lang="scss" scoped>
  [data-versus] {
    position: absolute;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%)
  }

  .border-gray {
    border: 1px solid gainsboro;
  }

  .rightPadding {
    .el-input__inner {
      border: 5px solid red;
      padding-right: 60px;
    }
  }
</style>
<script>
export default {
  props: {
    questionID: {
      type: Number
    },
    header: {
      type: String
    }
  },
  data() {
    return {
      question: {
        choiceIndex: this.questionID,
        title: '',
        options: [],
      },
      header: this.header,
      optionContent: {},
      optionData: ''
    }
  },
  created() {
    const data = {
      options: [{text:''}]
    }
    this.optionData = {...data};
  },
  computed: {
    showAddButton() {
      return function(option) {
        const optionLength = this.optionData.options.length;
        const targetIndex = this.optionData.options.indexOf(option);
        return optionLength - 1 === targetIndex;
      }
    }
  },
  methods : {
    enterAndGo(e) {
      let input;
      e.currentTarget.nodeName === 'BUTTON' ? 
        input = e.currentTarget.parentElement.parentElement :
        input = e.currentTarget;

      const inputIndex = input.children[0].dataset.index;
      
      if (input.nextSibling.nodeName === 'DIV') {
        const nextInput = input.nextSibling.children[0]; 
        nextInput.focus();
      } else {
        this.optionData.options.push({text:''});

        // after element is created...
        setTimeout(function() {
          const nextInput = input.nextSibling.children[0];
          nextInput.style.paddingRight = '60px';
          nextInput.focus();
        }.bind(this), 100)
      }
    },
    clearText(e, option) {
      const input = e.currentTarget.offsetParent.previousElementSibling;
      option.text = '';
      input.focus();
    },
    deleteOption(targetOption) {
      const targetIndex = this.optionData.options.indexOf(targetOption);
      this.$delete(this.optionData.options, targetIndex);
    },
    updateQuestionTitle() {
      this.$emit('updateTitle', this.question);
    },
    updateOptionContent(option, index) {
      this.question.options[index] = option.text;
      this.$emit('updateOptions', this.question);
    }
   }
}
</script>
