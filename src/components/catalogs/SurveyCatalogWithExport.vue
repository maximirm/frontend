<template>
  <FileExportContainer
      :exportData="mappedSurveyDataForExport"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition"
      :header="header">
    <SurveyCatalog
        :allInfosVisible="true"
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectFunction"/>
  </FileExportContainer>
</template>

<script>
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import FileExportContainer from "@/components/export/FileExportContainer.vue";

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
        {header: "Sichtbarkeit", dataKey: "Sichtbarkeit", width: 20},
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
        return [{
          Titel: this.selectedSurvey.title,
          Sichtbarkeit: this.selectedSurvey.isPublic ? "Öffentlich" : "Angemeldete Nutzer",
          Typ: '',
          Fragestellung: '',
          Antwort: '',
        }]
      }
      const data = [];
      this.selectedSurvey.questions.forEach((question) => {
        if (question.responses.length === 0) {
          data.push({
            Titel: this.selectedSurvey.title,
            Sichtbarkeit: this.selectedSurvey.isPublic ? "Öffentlich" : "Angemeldete Nutzer",
            Typ: this.getQuestionTypeText(question.type),
            Fragestellung: question.question_text,
            Antwort: '',
          })
        } else {
          question.responses.forEach((response) => {
            data.push({
              Titel: this.selectedSurvey.title,
              Sichtbarkeit: this.selectedSurvey.isPublic ? "Öffentlich" : "Angemeldet",
              Typ: this.getQuestionTypeText(question.type),
              Fragestellung: question.question_text,
              Antwort: response.response_text,
            });
          })
        }
      })
      return data;
    },
  },
  methods: {
    getQuestionTypeText(type) {
      switch (type) {
        case 1:
          return "Freitext";
        case 2:
          return "Dropdown";
        case 3:
          return "Checkbox";
        default:
          return "unknown";
      }
    }
  }
}
</script>
