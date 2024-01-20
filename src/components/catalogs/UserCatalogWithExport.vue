<template>
  <CatalogExport
      :exportData="mappedUserData"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <UserCatalog
        :users="users"
        :selectedUser="selectedUser"
        @userSelected="selectFunction"/>
  </CatalogExport>
</template>
<script>
import CatalogExport from "@/components/catalogs/CatalogExport.vue"
import UserCatalog from "@/components/catalogs/UserCatalog.vue"

export default {
  name: 'UserCatalogWithExport',
  components: {CatalogExport, UserCatalog},
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
