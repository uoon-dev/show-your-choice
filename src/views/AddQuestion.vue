<template>
  <div data-type="add/question">
    <form data-type="add/content">
      <fieldset>
        <legend data-title> 질문을 등록해주세요! </legend>
        <p data-title-questions>
          <label>질문</label><br>
          <input type="text" v-model="titleA" name="question-title-a" v-on:keydown.enter="enterAndGo">
          vs
          <input type="text" v-model="titleB" name="question-title-b" v-on:keydown.enter="enterAndGo">
        </p>
        <p data-answers>
          <label for="answer">답변</label>              
          <input  
            type="text" 
            v-for="(answer, index) in answers" 
            v-on:keydown.enter="enterAndGo"
            :key="index"
            :data-input="index">
        </p>
      </fieldset>
    </form>
  </div>
</template>
<style lang="scss" scoped>
  [data-type^="add"] {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  [data-type$="question"] {
    [data-type$="content"] {
      align-items: center;
      flex: 1;

      fieldset {
        width: 70%;

        [data-title-questions] {
          display: flex;
          flex-direction: column;
          align-content: space-around;
        }
      }
    }
  }

  fieldset {
    [data-title-questions] {
      input[type="text"] {
        align-self: center;
        width: 70%;
      }
    }
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
      // const index = e.currentTarget.dataset.index;
      const parentAttr = e.currentTarget.parentElement.dataset;
      const sibling = e.currentTarget.nextElementSibling;
      if (parentAttr.hasOwnProperty('answers')) {
        this.answers.push('');
      } else {
        sibling.focus();
      }
    }
  }
}
</script>
