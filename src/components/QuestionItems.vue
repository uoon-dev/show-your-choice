<template>
  <span data-type="show/content">
    <el-col :span="11">
      <p data-title-questions>
        <el-row :gutter="20">
          <el-col :span="16" :offset="5">
              <h2 :class="{noOption: choices.options.length < 1}">{{ choices.title }}</h2>
          </el-col>
        </el-row>
      </p>
      <p data-options>
        <el-row :gutter="20">
          <el-col :span="12" :offset="7">
            <!-- <h3 v-if="choices.options.length > 0">+ 옵션</h3> -->
            <el-checkbox-group v-model="optionCheckList" size="medium">
              <el-checkbox v-for="option in choices.options" :label="option" :key="option" border>{{option}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>              
      </p>
    </el-col>
    <el-col :span="1" v-if="this.choices.choiceIndex === 0">
      <p data-versus><strong>VS</strong></p>
    </el-col>
  </span>
</template>
<style lang="scss" scoped>
  [data-options] {
    margin-top: 40px;
    // h3 { margin-bottom: 40px; }
  }
  [data-versus] {
    position: absolute;
    top: 47vh;
    left: 50%;
    transform: translateX(-50%)
  }

  .noOption {
    position: absolute;
    top: 32vh;
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

  .el-checkbox-button {
    display: block;
    margin-bottom: 20px;

    .el-checkbox-button__inner {
      border: 1px solid gainsboro;
      border-radius: 5px;
    }
  }

  .el-checkbox.is-bordered.el-checkbox--medium {
    float: left;
    margin-bottom: 20px;
    padding: 12px 20px 25px 10px;

    &:nth-child(1) {
      margin-left: 10px;
    }
  }
</style>
<script>
  export default {
    props: {
      question: {
        type: Object
      }
    },
    data() {
      return {
        optionCheckList: [],
        choices: this.question
      }
    },
    created() {
      console.log(this.choices)
    },
    computed: {
    },
    methods : {
    }
  }
</script>
