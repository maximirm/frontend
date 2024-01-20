<template>
  <div>
    <StyledButton
        :onClickMethod="exportToCSV"
        :label="'CSV Export'"
        :isDisabled="csvData.length === 0"
    />
  </div>
</template>

<script>
import { exportToCSV } from "@/utils/csvExport";
import StyledButton from "@/components/buttons/StyledButton.vue";

export default {
  components: {
    StyledButton,
  },
  props: {
    csvData: {
      type: Array,
      default: () => [],
    },
    fileName: {
      type: String,
      default: "exported_data",
    },
  },
  methods: {
    exportToCSV() {
      if (this.csvData.length > 0) {
        exportToCSV(this.csvData, this.fileName + ".csv");
      }
    },
  },
};
</script>
