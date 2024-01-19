<template>
  <div class="question-list-container">
  <div class="question-list-box">
    <QuestionInfo
        v-for="(question, index) in questions"
        :key="index"
        :question="question"
        :isSelected="selectedQuestion && selectedQuestion.id === question.id"
        @questionSelected="selectQuestion(question)"/>
  </div>

  <div class="file-export-container">
    <FileExport
        :pdfData="mappedDataForExport"
        :csvData="mappedDataForExport"
        :pdfColumns="pdfColumns"
        :fileName="listTitle"/>
  </div>
  </div>
</template>

<script>
import QuestionInfo from "@/components/QuestionInfo.vue";
import FileExport from "@/components/FileExport.vue";

export default {
  components: {
    FileExport,
    QuestionInfo,
  },
  props: {
    questions: Array,
    selectedQuestion: Object,
    pdfColumns: {
      type: Array,
      required: true
    },
    listTitle: {
      type: String,
      required: true
    },
  },
  computed: {
    mappedDataForExport() {
      const data = [];
      this.questions.forEach((question) => {
        const questionData = {
          questionText: question.question_text,
          options: question.options.join(" "),
          numberOfResponses: question.responses.length,
        };
        data.push(questionData);
      });
      return data;
    },
  },
  methods: {
    selectQuestion(question) {
      this.$emit("questionSelected", question);
    },
  },
};
</script>
<style scoped>


h2 {
  margin-bottom: 20px;
}

.question-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-export-container {
  margin-top: 20px;
  flex-grow: 0;
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
