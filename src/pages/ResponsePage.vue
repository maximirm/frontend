<template>
  <div class="response-page">
    <div v-if="currentQuestionIndex < questions.length">

      <ResponseForm
          :question="questions[currentQuestionIndex]"
          @responseTextSubmitted="handleResponseSubmitted"
      ></ResponseForm>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
      </div>

    </div>
    <div v-else>
      <button @click="finishSurvey">Umfrage abschließen</button>
    </div>
  </div>
</template>

<script>
import ResponseForm from "@/components/ResponseForm.vue";

export default {
  components: { ResponseForm },
  data() {
    return {
      selectedSurvey: null,
      questions: [], // Füge hier deine Fragen hinzu
      currentQuestionIndex: 0,
      isAnonymous: true,// Index der aktuellen Frage
    };
  },
  computed: {
    progressBarWidth() {
      // Berechne den Fortschritt basierend auf currentQuestionIndex und der Anzahl der Fragen
      const totalQuestions = this.questions.length;
      const progress = ((this.currentQuestionIndex+1) / totalQuestions) * 100;
      return `${progress}%`;
    },
  },

  created() {
    this.selectedSurvey = this.$store.state.selectedSurvey;
    this.questions = this.selectedSurvey.questions;
    this.isAnonymous = this.$route.params.isAnonymous;
  },
  methods: {
    handleResponseSubmitted() {



      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        alert("Umfrage abgeschlossen Vielen Dank")
        this.$router.push({ name: 'RespondentPage', params: {isAnonymous: this.isAnonymous} });

        console.log("Umfrage abgeschlossen");
      }
    },

    finishSurvey() {
      // Diese Methode wird aufgerufen, wenn der "Umfrage abschließen"-Button geklickt wird.
      // Du kannst hier den Abschluss der Umfrage behandeln.
      console.log("Umfrage abschließen");
    },
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
.progress-bar-container {
  margin-top: 20px;
  height: 10px;
  background-color: #eee;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease-in-out;
}

</style>
