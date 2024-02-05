<template>
  <v-container>
    <v-card class="survey-catalog" outlined>
      <v-list class="survey-list">
        <SurveyCard
            v-for="(survey, index) in surveys"
            :key="index"
            :survey="survey"
            :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
            @surveySelected="selectSurvey(survey)"/>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import SurveyCard from "@/components/cards/SurveyCard.vue";

export default {
  components: {
    SurveyCard,
  },
  props: {
    surveys: {
      type: Array,
      required: true
    },
    selectedSurvey: {
      type: Object,
    },
  },
  computed: {
    label() {
      return this.surveys.length > 0 ? 'Umfragen' : '';
    }
  },
  methods: {
    selectSurvey(survey) {
      this.$emit("surveySelected", survey);
    },
  },
};
</script>
<style scoped>

.survey-catalog {
  max-height: 400px;
  overflow-y: auto;
}

.survey-list {
  padding: 0;
}

.survey-catalog::-webkit-scrollbar {
  width: 10px;
}

.survey-catalog::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
 }

</style>
