<template>
  <div class="response-page">
    <div v-if="currentQuestionIndex < questions.length">
      <ResponseForm
          :question="questions[currentQuestionIndex]"
          @responseTextSubmitted="handleResponseSubmitted"/>
      <ProgressBar
          :progressBarWidth="progressBarWidth"/>
      <BaseButton
          :click-handler="redirectToRespondentPage"
          :button-text="'Zurück'"/>
    </div>
  </div>
</template>

<script>
import ResponseForm from "@/components/ResponseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  components: {ProgressBar, BaseButton, ResponseForm},
  data() {
    return {
      selectedSurvey: null,
      questions: [],
      currentQuestionIndex: 0,
      isAnonymous: true,
    };
  },
  computed: {
    progressBarWidth() {
      const totalQuestions = this.questions.length;
      const progress = ((this.currentQuestionIndex + 1) / totalQuestions) * 100;
      return `${progress}%`;
    },
  },
  methods: {
    handleResponseSubmitted() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        alert("Umfrage abgeschlossen. Vielen Dank")
        this.$router.push({name: 'RespondentPage', params: {isAnonymous: this.isAnonymous}});
      }
    },

    redirectToRespondentPage() {
      this.$router.push({name: 'RespondentPage', params: {isAnonymous: this.isAnonymous}});
    }
  },
  created() {
    this.selectedSurvey = this.$store.state.selectedSurvey;
    this.questions = this.selectedSurvey.questions;
    this.isAnonymous = this.$route.params.isAnonymous;
  },
};
</script>

<style scoped>

.response-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
}

</style>
