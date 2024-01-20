<template>
    <StyledButton
        :onClickMethod="exportToPDF"
        :label="'PDF Export'"
        :isDisabled="pdfData.length === 0"
        :class="'green-btn'"/>
</template>

<script>
import { exportDataToPDF } from "@/utils/pdfExport";
import StyledButton from "@/components/buttons/StyledButton.vue";

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
    columnDefinition: {
      type: Array,
      required: true,
    },
  },
  methods: {
    exportToPDF() {
      if (this.pdfData.length > 0) {
        exportDataToPDF(this.pdfData, this.columnDefinition, this.fileName + ".pdf");
      }
    },
  },
};
</script>
