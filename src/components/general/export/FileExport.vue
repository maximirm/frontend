<template>
  <PDFExport
      :pdfData="exportData"
      :fileName="fileName"
      :columnDefinition="pdfColumnDefinition"
      :header="header"/>
  <CSVExport
      :csvData="exportData"
      :fileName="fileName"/>
</template>

<script>
import PDFExport from "@/components/general/export/PDFExport.vue";
import CSVExport from "@/components/general/export/CSVExport.vue";

export default {
  components: {
    CSVExport,
    PDFExport
  },
  props: {
    exportData: {
      type: Array,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    header: {
      type: String,
    },
    pdfColumnDefinition: {
      type: Array,
      required: true,
    },
  },
};
</script>
