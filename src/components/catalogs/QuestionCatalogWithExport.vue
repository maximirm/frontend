<template>
  <CatalogExport
      :exportData="mappedQuestionData"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <QuestionCatalog
        :questions="questions"
        :selectedQuestion="selectedQuestion"
        @questionSelected="selectFunction"/>
  </CatalogExport>
</template>

<script>
import CatalogExport from "@/components/catalogs/CatalogExport.vue"
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";

export default {
  components: {
    QuestionCatalog,
    CatalogExport,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    mappedQuestionData: {
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
    selectedQuestion: {
      type: Array,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    }
  }
}
</script>
