<template>
  <StyledCard
      @click="selectSurvey"
      :class="{ 'selected': isSelected }">
    <InfoPair
        :label="'Titel:'"
        :value="survey.title"/>
    <InfoPair
        :label="'Beschreibung:'"
        :value="survey.description"/>
    <InfoPair
        :value="survey.questions.length + ' Fragen'"/>
  </StyledCard>
</template>

<script>
import StyledCard from "@/components/cards/StyledCard.vue";
import InfoPair from "@/components/general/InfoPair.vue";

export default {
  name: 'SurveyCard',
  components: {InfoPair, StyledCard},
  props: {
    survey: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
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

