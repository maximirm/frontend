<template>
  <div>
    <div v-if="currentQuestionIndex < questions.length">
      <ResponseForm
          :question="questions[currentQuestionIndex]"
          @responseTextSubmitted="handleResponseSubmitted"
      ></ResponseForm>
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
      currentQuestionIndex: 0, // Index der aktuellen Frage
    };
  },
  created() {
    this.selectedSurvey = this.$store.state.selectedSurvey;
    this.questions = this.selectedSurvey.questions;
    console.log(this.questions)
  },
  methods: {
    handleResponseSubmitted() {
      // Diese Methode wird aufgerufen, wenn eine Antwort eingereicht wurde.
      // Hier kannst du die Antwort speichern und zur nächsten Frage wechseln.
      // Implementiere deine Logik zur Antwortspeicherung hier.

      if (this.currentQuestionIndex < this.questions.length - 1) {
        // Gehe zur nächsten Frage
        this.currentQuestionIndex++;
      } else {
        // Alle Fragen wurden beantwortet
        // Du kannst hier weitere Aktionen durchführen oder den Abschluss der Umfrage signalisieren
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
/* Stile für deine Komponente */
</style>
