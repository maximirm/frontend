<template>
  <div class="question-list-box">
    <QuestionInfo
        v-for="(question, index) in questions"
        :key="index"
        :question="question"
        :isSelected="selectedQuestion && selectedQuestion.id === question.id"
        @questionSelected="selectQuestion"
    />
  </div>
</template>

<script>
import QuestionInfo from "@/components/QuestionInfo.vue";

export default {
  components: {
    QuestionInfo,
  },
  props: {
    questions: Array, // Die Liste der Fragen, die von der übergeordneten Komponente übergeben wird
    selectedQuestion: Object, // Das ausgewählte Frage-Objekt von der übergeordneten Komponente
  },
  methods: {
    selectQuestion(question) {
      // Die Methode zum Auswählen einer Frage wird von der übergeordneten Komponente aufgerufen
      this.$emit("questionSelected", question);
    },
  },
};
</script>
<style scoped>


h2 {
  margin-bottom: 20px;
}

.question-list-box {
  width: 500px;
  overflow-y: auto;
  height: 600px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
}

.question-list-box::-webkit-scrollbar {
  width: 8px;
}

.question-list-box::-webkit-scrollbar-thumb {
  background-color: #555;
}

.question-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777;
}

</style>
