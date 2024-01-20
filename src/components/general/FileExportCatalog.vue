<template>
  <div class="file-export-catalog">
    <slot></slot>
    <FileExport
        :pdfColumnDefinition="pdfColumnDefinition"
        :fileName="label"
        :exportData="exportData"/>
  </div>
</template>

<script>
import FileExport from "@/components/export/FileExport.vue";

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
    exportData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

.file-export-catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
