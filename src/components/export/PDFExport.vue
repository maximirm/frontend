<template>
  <StyledButton
      :onClickMethod="exportToPDF"
      :label="'PDF Export'"
      :isDisabled="pdfData.length === 0"
      :class="'green-btn'"/>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";
import {exportDataToPDF} from "@/scripts/export/pdfExport";

export default {
  components: {
    StyledButton,
  },
  props: {
    pdfData: {
      type: Array,
      required: true,
    },
    fileName: {
      type: String,
      default: "exported_data",
    },
    header: {
      type: String,
      default: 'PDF Export'
    },
    columnDefinition: {
      type: Array,
      required: true,
    },
  },
  methods: {
    exportToPDF() {
      if (this.pdfData.length > 0) {
        exportDataToPDF(this.pdfData, this.columnDefinition, this.fileName + ".pdf", this.header);
      }
    },
  },
};
</script>
