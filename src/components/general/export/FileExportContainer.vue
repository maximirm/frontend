<template>
  <div class="file-export-container">
    <slot></slot>
    <FileExport
        :pdfColumnDefinition="pdfColumnDefinition"
        :fileName="label"
        :exportData="exportData"
        :header="header"/>
  </div>
</template>

<script>
import FileExport from "@/components/general/export/FileExport.vue";

export default {
  components: {
    FileExport,
  },
  props: {
    pdfColumnDefinition: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    header: {
      type: String
    },
    exportData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

.file-export-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
