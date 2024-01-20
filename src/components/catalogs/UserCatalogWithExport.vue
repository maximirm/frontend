<template>
  <FileExportCatalog
      :exportData="mappedUserData"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <UserCatalog
        :users="users"
        :selectedUser="selectedUser"
        @userSelected="selectFunction"/>
  </FileExportCatalog>
</template>

<script>
import UserCatalog from "@/components/catalogs/UserCatalog.vue"
import FileExportCatalog from "@/components/general/export/FileExportCatalog.vue";

export default {
  components: {
    FileExportCatalog,
    UserCatalog
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    mappedUserData: {
      type: Array,
      required: true,
    },
    pdfColumnDefinition: {
      type: Array,
      required: true,
    },
    selectFunction: {
      type: Function,
      required: true,
    },
    selectedUser: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    }
  }
}
</script>
