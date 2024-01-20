<template>
  <div>
    <PDFExport
        :pdfData="pdfData"
        :fileName="fileName"
        :columnDefinition="columnDefinition"/>
    <CSVExport
        :csvData="csvData"
        :fileName="fileName"/>
  </div>
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
    pdfData: Array,
    csvData: Array,
    fileName: String,
    columnDefinition: Array,
  },
};
</script>
