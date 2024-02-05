<template>
  <div class="d-flex align-center flex-column">
    <v-card
        :class="{ 'selected': isSelected }"
        @click="selectSurvey"
        class="survey-card"
        flat>
      <v-card-text>
        <div class="card-content">
          <h2>{{ survey.title }}</h2>
          <p class="caption">{{ survey.description }}</p>
          <p class="caption">Anzahl Fragestellungen: {{ survey.questions.length }}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SurveyCard',
  props: {
    survey: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectSurvey() {
      this.$emit('surveySelected', this.survey);
    },
  },
};
</script>

<style scoped>

.survey-card {
  width: 400px;
  height: 80px;
  transition: background-color 0.3s;
  background-color: rgba(67, 154, 217, 0.15);
}

.selected {
  background-color: rgba(67, 154, 217, 0.5);
  color: #1A237E;
}

.card-content h2 {
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 1em;
}

.caption {
  font-size: 0.8rem;
  color: #1A237E;
  margin: 0;
}

</style>
