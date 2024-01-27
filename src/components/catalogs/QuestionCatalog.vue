<template>
  <v-container>
    <v-card class="question-catalog" outlined>
      <v-list class="question-list">
        <QuestionCard
            v-for="(question, index) in questions"
            :key="index"
            :question="question"
            :isSelected="selectedQuestion && selectedQuestion.id === question.id"
            @questionSelected="selectQuestion(question)"/>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import QuestionCard from "@/components/cards/QuestionCard.vue";

export default {
  components: {
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
  max-height: 400px;
  overflow-y: auto;
}

.question-list {
  padding: 0;
}

.question-catalog::-webkit-scrollbar {
  width: 10px;
}

.question-catalog::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
</style>

