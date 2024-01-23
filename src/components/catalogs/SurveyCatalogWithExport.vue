<template>
  <FileExportContainer
      :exportData="mappedSurveyDataForExport"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition"
      :header="header">
    <SurveyCatalog
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectFunction"/>
  </FileExportContainer>
</template>

<script>
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import FileExportContainer from "@/components/general/export/FileExportContainer.vue";

export default {
  components: {
    FileExportContainer,
    SurveyCatalog,
  },
  props: {
    selectFunction: {
      type: Function,
      required: true,
    },
    selectedSurvey: {
      type: Object,
      required: true,
    },
    surveys: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      label: "Umfrageliste",
      pdfColumnDefinition: [
        {header: "Titel", dataKey: "Titel", width: 30},
        {header: "Typ", dataKey: "Typ", width: 10},
        {header: "Fragestellung", dataKey: "Fragestellung", width: 50},
        {header: "Antwort", dataKey: "Antwort", width: 50},
      ],
    }
  },
  computed: {
    header() {
      return this.selectedSurvey ? this.selectedSurvey.title + ': ' + this.selectedSurvey.description : '';
    },
    mappedSurveyDataForExport() {
      if (!this.selectedSurvey) {
        return []
      }
      if (this.selectedSurvey.questions.length === 0) {
        return [{Titel: this.selectedSurvey.title}]
      }
      const data = [];
      this.selectedSurvey.questions.forEach((question) => {
        if (question.responses.length === 0) {
          data.push({
            Titel: this.selectedSurvey.title,
            Typ: question.type,
            Fragestellung: question.question_text
          })
        } else {
          question.responses.forEach((response) => {
            data.push({
              Titel: this.selectedSurvey.title,
              Typ: question.type,
              Beschreibung: this.selectedSurvey.description,
              Fragestellung: question.question_text,
              Antwort: response.response_text,
            });
          })
        }
      })
      return data;
    },
  },
}
</script>
