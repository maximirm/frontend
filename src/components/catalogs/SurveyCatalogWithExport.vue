<template>
  <CatalogExport
      :exportData="mappedSurveyData"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <SurveyCatalog
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectFunction"/>
  </CatalogExport>
</template>

<script>
import CatalogExport from "@/components/catalogs/CatalogExport.vue";
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";

export default {
  components: {
    SurveyCatalog,
    CatalogExport
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    mappedSurveyData: {
      type: Array,
      required: true,
    },
    pdfColumnDefinition: {
      type: Array,
      required: true,
    },
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
}
</script>
