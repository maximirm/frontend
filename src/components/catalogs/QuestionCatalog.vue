<template>

  <div class="container">
    <h2>Fragestellungen</h2>
  <v-card class="mx-auto" max-height="600" style="overflow-y: auto;">
    <v-list
        density="compact"
        style="margin: 0; padding: 0;">
      <QuestionCard
          v-for="(question, index) in questions"
          :key="index"
          :question="question"
          :isSelected="selectedQuestion && selectedQuestion.id === question.id"
          @questionSelected="selectQuestion(question)"/>
    </v-list>
  </v-card>
  </div>
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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-card::-webkit-scrollbar {
  width: 0; /* Breite der Scrollleiste auf 0 setzen */
}

.v-card::-webkit-scrollbar-thumb {
  background-color: transparent; /* Daumen (Thumb) der Scrollleiste transparent machen */
}
</style>

