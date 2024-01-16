<template>
  <div class="create-question-page">
    <div class="left-section">
      <h1>Umfrage:</h1>
      <h2>{{ survey.title }}</h2>
      <p>{{ survey.description }}</p>
      <QuestionForm @form-submitted="handleFormSubmission"/>
    </div>
    <div class="right-section">
      <!-- Hier rechts anzeigen, was auch immer Sie wollen -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QuestionForm from "@/components/QuestionForm.vue";

export default {
  data() {
    return {
      survey: {
        id: null,
        questions: [],
        creator_id: null,
        title: '',
        description: '',
      },
    };
  },
  components: {
    QuestionForm,
  },
  mounted() {
    this.fetchSurvey();
  },
  methods: {
    async fetchSurvey() {
      try {
        const token = localStorage.getItem('token');
        const surveyId = localStorage.getItem('survey-created-id');

        const response = await axios.get(`http://localhost:8002/surveys/${surveyId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.survey = response.data;
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Umfrage:', error);
      }
    },
    handleFormSubmission(formData) {
      // Hier können Sie mit den Formulardaten arbeiten, die von der Komponente gesendet wurden
      console.log('Formulardaten erhalten:', formData);
    },
  },
};
</script>

<style scoped>
.create-question-page {
  display: flex;
  flex-direction: row; /* Vertikal teilen */
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.left-section,
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.left-section {
  flex: 30;
  background-color: #555;
}

.right-section {
  flex: 70;
  background-color: #777;
}
</style>
