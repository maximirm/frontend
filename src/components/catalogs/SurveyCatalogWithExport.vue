<template>
  <FileExportContainer
      :exportData="mappedSurveyDataForExport"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
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
        {header: "Titel", dataKey: "Titel", width: 40},
        {header: "Beschreibung", dataKey: "Beschreibung", width: 30},
        {header: "Fragestellung", dataKey: "Fragestellung", width: 50},
        {header: "Antwort", dataKey: "Antwort", width: 50},
      ],
    }
  },
  computed: {
    mappedSurveyDataForExport() {
      if(this.selectedSurvey) {
        const data = [];
        this.selectedSurvey.questions.forEach((question) => {
          question.responses.forEach((response) => {
            const responseData = {
              Titel: this.selectedSurvey.title,
              Beschreibung: this.selectedSurvey.description,
              Fragestellung: question.question_text,
              Antwort: response.response_text,
            };
            data.push(responseData);
          })
        })
        return data;
      }return []
    },
  }
}
</script>
