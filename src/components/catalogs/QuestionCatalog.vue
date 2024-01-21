<template>
  <StyledCatalog
      :label="label">
    <QuestionCard
        v-for="(question, index) in questions"
        :key="index"
        :question="question"
        :isSelected="selectedQuestion && selectedQuestion.id === question.id"
        @questionSelected="selectQuestion(question)"/>
  </StyledCatalog>
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
  computed:{
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

