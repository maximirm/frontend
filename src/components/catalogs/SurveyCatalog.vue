<template>
  <v-card class="mx-auto" max-height="500" style="overflow-y: auto;">
    <v-list
        density="compact"
        style="margin: 0; padding: 0; ">
      <SurveyCard
          v-for="(survey, index) in surveys"
          :key="index"
          :survey="survey"
          :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
          @surveySelected="selectSurvey(survey)"/>
    </v-list>
  </v-card>
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
      return this.surveys.length > 0 ? 'Umfragen' : ''
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
.v-card::-webkit-scrollbar {
  width: 0; /* Breite der Scrollleiste auf 0 setzen */
}

.v-card::-webkit-scrollbar-thumb {
  background-color: transparent; /* Daumen (Thumb) der Scrollleiste transparent machen */
}
</style>
