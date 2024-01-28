<template>
  <BoxWrapper height="650px" width="1400px">
    <div class="analyse-questions-page">
      <div class="question-panel-container">
            <h2 v-if="questions.length > 0">
              Fragestellungen
            </h2>
            <QuestionCatalog
                v-if="questions.length > 0"
                :questions="questions"
                :selectedQuestion="selectedQuestion"
                @questionSelected="selectQuestion"/>
            <StyledButton
                :label="'Antworten analysieren'"
                :onClickMethod="analyseQuestion"
                :isDisabled="!selectedQuestion || selectedQuestion.responses.length === 0"
                :class="'green-btn'"/>
      </div>

      <div class="analysis-panel-container">
          <h2 v-if="analysisComplete">
            Analyse
          </h2>
          <AnalysisPanel
              :barChartData="responseAnalysis"
              :barChartLabel="'Antworten'"
              :bar-chart-is-disabled="isFreeTextQuestion"
              :pieChartData="respondentsAnalysis"
              :pieChartLabel="'Befragte'"
              :analysisIsComplete="analysisComplete"/>
      </div>
    </div>
  </BoxWrapper>
</template>


<script>
import BoxWrapper from "@/components/generic/BoxWrapper.vue";
import {fetchAnalysedQuestion} from "@/scripts/api/analysisApi";
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import AnalysisPanel from "@/components/analysis/AnalysisPanel.vue";

export default {
  components: {
    StyledButton,
    QuestionCatalog,
    BoxWrapper,
    AnalysisPanel
  },
  data() {
    return {
      survey: null,
      questions: null,
      message: '',
      selectedQuestion: null,
      analysisComplete: false,
      responseAnalysis: [],
      respondentsAnalysis: [],
    };
  },
  created() {
    this.survey = this.$store.state.selectedSurvey;
    this.questions = this.survey.questions;
  },
  computed: {
    isFreeTextQuestion() {
      return this.selectedQuestion === null || this.selectedQuestion.type === 1;
    },
  },
  methods: {
    selectQuestion(question) {
      this.responseAnalysis = [];
      this.respondentsAnalysis = [];
      this.analysisComplete = false;
      this.selectedQuestion = question;
    },


    async analyseQuestion() {
      if (!this.selectedQuestion) {
        return;
      }
      try {
        const token = this.$store.state.userToken;

        const analyzedQuestionResponse = await fetchAnalysedQuestion(token, this.selectedQuestion.id);

        this.responseAnalysis = analyzedQuestionResponse.analysis_responses;
        this.respondentsAnalysis = analyzedQuestionResponse.analysis_respondents;
        this.analysisComplete = true;
      } catch (error) {
        this.analysisComplete = false;
      }
    },
  },
};
</script>
<style scoped>


.analyse-questions-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80vh;
  overflow: hidden;
  width: 100%
}

.question-panel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  height: 80vh;
}

.analysis-panel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 80vh;
}

</style>
