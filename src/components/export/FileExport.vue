<template>
    <PDFExport
        :pdfData="pdfData"
        :fileName="fileName"
        :columnDefinition="pdfColumnDefinition"/>
    <CSVExport
        :csvData="csvData"
        :fileName="fileName"/>
</template>

<script>
import PDFExport from "@/components/export/PDFExport.vue";
import CSVExport from "@/components/export/CSVExport.vue";

export default {
  components: {
    CSVExport,
    PDFExport
  },
  props: {
    pdfData: {
      type: Array,
      required: true,
    },
    csvData: {
      type: Array,
      required: true,
    },
    fileName: {
      type: String,
      required: true,Array
    },
    pdfColumnDefinition: {
      type: Array,
      required: true,Array
    },
  },
};
</script>
