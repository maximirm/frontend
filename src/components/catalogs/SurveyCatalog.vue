<template>
  <StyledCatalog
      :label="label">
    <SurveyCard
        v-for="(survey, index) in surveys"
        :key="index"
        :survey="survey"
        :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
        @surveySelected="selectSurvey(survey)"/>
  </StyledCatalog>
</template>

<script>
import SurveyCard from "@/components/cards/SurveyCard.vue";
import StyledCatalog from "@/components/general/StyledCatalog.vue";

export default {
  components: {
    StyledCatalog,
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
