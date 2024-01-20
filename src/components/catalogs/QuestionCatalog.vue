<template>
  <StyledCatalog>
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
import StyledCatalog from "@/components/catalogs/StyledCatalog.vue";

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
  methods: {
    selectQuestion(question) {
      this.$emit("questionSelected", question);
    },
  },
};
</script>

