<template>
  <div>
    <StyledButton
        :onClickMethod="exportToCSV"
        :label="'CSV Export'"
        :isDisabled="csvData.length === 0"
        :class="'green-btn'"/>
  </div>
</template>

<script>
import { exportToCSV } from "@/scripts/export/csvExport";
import StyledButton from "@/components/general/buttons/StyledButton.vue";

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
