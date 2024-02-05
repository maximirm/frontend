<template>
  <FileExportContainer
      :exportData="mappedUserData"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition"
      :header="header">
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
  },
  data(){
    return {
      label: "Benutzerliste",
      pdfColumnDefinition: [
        {header: "ID", dataKey: "id", width: 40},
        {header: "Name", dataKey: "name", width: 30},
        {header: "Rolle", dataKey: "role", width: 50},
        {header: "Anzahl der Umfragen", dataKey: "numberOfSurveys", width: 50},
      ],
    }
  },
  computed: {
    header() {
      return this.selectedUser ? this.selectedUser.name : '';
    },
    mappedUserData() {
      const data = [];
      this.users.forEach((user) => {
        const userData = {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
          numberOfSurveys: user.numberOfSurveys.toString(),
        };
        data.push(userData);
      });
      return data;
    },
  },
}
</script>
