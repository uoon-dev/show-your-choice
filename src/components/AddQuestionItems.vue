<template>
  <span data-type="add/content">
    <el-col :span="10" :offset="1">
      <p data-title-questions>
        <el-row :gutter="20">
          <el-col :span="16" :offset="5">
              <input
                :class="[question.title.length > 0 ? 'stay' : '', 'paori']"
                v-model="question.title" 
                @keyup="updateQuestionTitle"
                autofocus>
              </input>
              <label data-title>질문</label>
              <div data-border-bottom></div>
          </el-col>
        </el-row>
      </p>
      <p data-options>
        <el-row :gutter="20">
          <el-col :span="12" :offset="7">
            <div data-options-content v-for="(option, index) in optionData.options" :key="index">
              <input
                v-model="option.text"
                @keydown.enter="enterAndGo"
                @keyup="updateOptionContent(option, index)"
                :class="[{rightPadding: index !== 0}, [option.text.length > 0 ? 'stay' : '', 'ggobugi']]"
                
                :data-index="index"
                style="margin-bottom: 10px;">
                <!-- <i
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
                </template> -->
              </input>
              <label data-title>옵션</label>
              <div data-options-box></div>
            </div>
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
  [data-title-questions] {
    position: relative;
    margin-bottom: 100px;
    
    input {
      width: 90%;
      height: 35px;
      padding: 0 10px 7px 10px;
      font-size: 24px;
      border: none;
      border-bottom: 2px solid gainsboro;
      outline: none;

      &.stay ~ [data-title] {
          top: -25px;
          left: 25%;
          font-size: 15px;
          color: steelblue;
      }

      &.stay ~ [data-border-bottom] {
         width: 60.5%;     
      }

      &.paori {
        &:focus ~ [data-title] {
          top: -25px;
          left: 25%;
          font-size: 15px;
          color: steelblue;
        }
          
        &:focus ~ [data-border-bottom] {
          width: 60.5%;
        }
      }
    }

    [data-title] {
      position: absolute;
      top: 15%;
      left: 25%;
      font-weight: 600;
      color: gray;
      transition: all 0.3s cubic-bezier(0.18, 0.87, 0.74, 1.51);
    }
  
    [data-border-bottom] {
      position: absolute;
      bottom: 0.5px;
      left: 24%;
      width: 0;
      height: 2px;
      background: steelblue;
      transition: all 0.2s ease-out;
    }
  }

  [data-options] {
    [data-options-content] {
      position: relative;
      margin-bottom: 60px;

      input {
        width: 80%;
        height: 40px;
        margin-top: -20px;
        padding: 0 10px 7px 10px;
        font-size: 18px;
        border: none;
        border-bottom: 2px solid gainsboro;
        outline: none;
        transition: all 0.3s ease-out;

        &.stay {
          height: 30px;
          margin-top: 0px;
          padding: 3px 10px 3px 10px;
          
          & ~ [data-title] {
            top: -24px;
            left: 8%;
            font-size: 12px;
            color: white;
          }

          & ~ [data-options-box] {
            position: absolute;
            top: -31px;
            left: 2%;
            z-index: -1;
            width: 95%;
            background: steelblue;
            height: 78px;   
          }
        }

        &.ggobugi {
          &:focus ~ [data-title] {
            top: -24px;
            left: 8%;
            font-size: 12px;
            color: white;
          }

          &:focus ~ [data-options-box] {
            position: absolute;
            top: -31px;
            left: 2%;
            z-index: -1;
            width: 95%;
            background: steelblue;
            height: 78px;   
          }

          &:focus {
            height: 30px;
            margin-top: 0px;
            padding: 3px 10px 3px 10px;
          }
        }
      }

      [data-title] {
        position: absolute;
        top: 2px;
        left: 10%;
        font-size: 15px;
        font-weight: 600;
        color: gray;
        transition: all 0.3s ease-out; 
      }
      
      [data-options-box] {
        transition: all 0.3s ease-out;
      }
    }
  }
   

  [data-versus] {
    position: absolute;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%)
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
      const input = e.currentTarget;
      const inputIndex = input.dataset.index;
      let nextElement = input.parentElement.nextElementSibling;
      
      if (nextElement) {
        const nextInput = nextElement.children[0]; 
        nextInput.focus();
      } else {
        this.optionData.options.push({text:''});

        // after element is created...
        setTimeout(function() {
          nextElement = input.parentElement.nextElementSibling;
          const nextInput = nextElement.children[0]; 
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
