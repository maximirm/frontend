<template>
  <FileExportContainer
      :exportData="mappedQuestionDataForExport"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <QuestionCatalog
        :questions="questions"
        :selectedQuestion="selectedQuestion"
        @questionSelected="selectFunction"/>
  </FileExportContainer>
</template>

<script>
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";
import FileExportContainer from "@/components/general/export/FileExportContainer.vue";

export default {
  components: {
    FileExportContainer,
    QuestionCatalog,
  },
  props: {
    selectFunction: {
      type: Function,
      required: true,
    },
    selectedQuestion: {
      type: Array,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      label: "Frageliste",
      pdfColumnDefinition: [
        {header: "Fragestellung", dataKey: "questionText", width: 40},
        {header: "Optionen", dataKey: "options", width: 30},
        {header: "Anzahl der Antworten", dataKey: "numberOfResponses", width: 50}
      ]
    }
  },
  computed: {
    mappedQuestionDataForExport() {
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
}
</script>
