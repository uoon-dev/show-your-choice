<template>
  <div class="question">
    <h1>{{ title }}</h1>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import api from '../services/api';
import questions from '../data/questions';
export default {
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    this.saveQuestion().then((res) => {
      console.log(res);
    })

  },
  methods : {
    async saveQuestion() {
      const data = {
        "id": "uuid형식",
        "userId": "작성자 id",
        "choices": [
          {
            "choiceIndex": 0,
            "title": "연봉 1억 2천만원 받고 개인섬 저택 관리인 하기",
            "options": [
                "한달에 한번 보급선 왕복",
                "인터넷은 되지만 느림 위성전화 사용 가능",
                "집안 청결상태는 어느 정도 유지",
                "나머지는 개인시간",
                "1년 휴가 한달 가능",
                "3년간 고용보장"
            ],
            "imgs": [
                "http://cfile272.uf.daum.net/image/2306E94C57EFAD5736C40A"
          ]
          },
          {
          "choiceIndex": 1,
            "title": "그냥 살기",
            "options": [],
            "imgs": []
          }
        ],
        "result": [
          123,
          456
        ]
      };

      await api().put('questions.json', data );
    }
  }
}
</script>