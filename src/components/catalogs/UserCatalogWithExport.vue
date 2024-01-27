<template>
  <FileExportContainer
      :exportData="mappedUserData"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <UserCatalog
        :users="users"
        :selectedUser="selectedUser"
        @userSelected="selectFunction"/>
  </FileExportContainer>
</template>

<script>
import UserCatalog from "@/components/catalogs/UserCatalog.vue"
import FileExportContainer from "@/components/export/FileExportContainer.vue";

export default {
  components: {
    FileExportContainer,
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
