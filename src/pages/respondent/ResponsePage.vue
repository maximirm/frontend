<template>
  <BoxWrapper
      height="500px"
  width="500px">
  <div class="response-page">
    <div class="response-form">
      <h2>{{ selectedSurvey.title }}</h2>
      <h3>{{ selectedSurvey.description }}</h3>
    </div>
    <div v-if="currentQuestionIndex < questions.length">
      <ResponseForm
          :question="questions[currentQuestionIndex]"
          @responseTextSubmitted="handleResponseSubmitted"/>
      <ProgressBar
          :progressBarWidth="progressBarWidth"/>
    </div>
  </div>
  </BoxWrapper>
</template>

<script>
import ResponseForm from "@/components/forms/ResponseForm.vue";
import ProgressBar from "@/components/generic/ProgressBar.vue";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";

export default {
  components: {
    BoxWrapper,
    ProgressBar,
    ResponseForm
  },
  data() {
    return {
      selectedSurvey: null,
      questions: [],
      currentQuestionIndex: 0,
    };
  },
  computed: {
    progressBarWidth() {
      const totalQuestions = this.questions.length;
      const progress = ((this.currentQuestionIndex) / totalQuestions) * 100;
      return `${progress}%`;
    },
  },
  methods: {
    handleResponseSubmitted() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        alert("Umfrage abgeschlossen. Vielen Dank");
        this.$router.push({name: 'RespondentPage'});
      }
    },
  },
  created() {
    this.selectedSurvey = this.$store.state.selectedSurvey;
    this.questions = this.selectedSurvey.questions.sort((a, b) => a.order - b.order);
  },
};
</script>

<style scoped>

.response-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  overflow: hidden;
}

.response-form{
  text-align: center;
}

h3{
 margin-bottom: 50px;
}

</style>
