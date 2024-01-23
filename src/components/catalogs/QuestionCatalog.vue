<template>
  <div class="question-catalog">
    <StyledCatalog
        :label="label">
      <QuestionCard
          v-for="(question, index) in questions"
          :key="index"
          :question="question"
          :isSelected="selectedQuestion && selectedQuestion.id === question.id"
          @questionSelected="selectQuestion(question)"/>
    </StyledCatalog>
  </div>
</template>

<script>
import QuestionCard from "@/components/cards/QuestionCard.vue";
import StyledCatalog from "@/components/general/StyledCatalog.vue";

export default {
  components: {
    StyledCatalog,
    QuestionCard,
  },
  props: {
    questions: {
      type: Array,
      required: true
    },
    selectedQuestion: {
      type: Object,
    },
  },
  computed: {
    label() {
      return this.questions.length > 0 ? 'Fragestellungen' : ''
    }
  },
  methods: {
    selectQuestion(question) {
      this.$emit("questionSelected", question);
    },
  },
};
</script>
<style scoped>

.question-catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

