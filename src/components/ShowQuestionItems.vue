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
            <div v-for="(option, index) in choices.options" :key="option">
              <p-check 
                class="p-icon p-image p-curve p-tada p-plain" 
                v-model="choices.checkOptions[index]">
                <img slot="extra" class="image" src="../assets/logo.png" style="width: 15px;">
                <!-- <i slot="extra" class="icon mdi mdi-weather-night"></i> -->
                {{option}}
              </p-check>
            </div>
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

  .pretty {
    margin-bottom: 25px;
    float: left;
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
        choices: { 
            ...this.question,
            checkOptions: []
          }
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
