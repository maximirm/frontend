<template>
  <div>
    <BaseButton
        :click-handler="exportToPDF"
        :button-text="'PDF Export'"
        :is-disabled="pdfData.length === 0"/>
    <BaseButton
        :click-handler="exportToCSV"
        :button-text="'CSV Export'"
        :is-disabled="csvData.length === 0"/>
  </div>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";
import {exportDataToPDF} from "@/utils/pdfExport";
import {exportToCSV} from "@/utils/csvExport";

export default {
  components: {
    BaseButton,
  },
  props: {
    pdfData: {
      type: Array,
      default: () => [],
    },
    csvData: {
      type: Array,
      default: () => [],
    },
    fileName: {
      type: String,
      default: "exported_data",
    },
    pdfColumns: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    exportToPDF() {
      if (this.pdfData.length > 0) {
        exportDataToPDF(this.pdfData, this.pdfColumns, this.fileName + ".pdf");
      }
    },
    exportToCSV() {
      if (this.csvData.length > 0) {
        exportToCSV(this.csvData, this.fileName + ".csv");
      }
    },
  },
};
</script>
