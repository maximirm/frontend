<template>
  <div>
    <div class="user-list-box">
      <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          :isSelected="selectedUser && user.id === selectedUser.id"
          @userSelected="selectUser(user)"/>
    </div>

    <div class="user-export-container" v-if="showFileExport">
      <FileExport
          :pdfData="mappedDataForExport"
          :csvData="mappedDataForExport"
          :pdfColumns="pdfColumns"
          :fileName="listTitle"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/cards/UserInfo.vue";
import FileExport from "@/components/export/FileExport.vue";

export default {
  components: {
    UserInfo,
    FileExport,
  },
  props: {
    users: {
      type: Array,
      required: true
    },
    pdfColumns: {
      type: Array,
      required: true
    },
    listTitle: {
      type: String,
      required: true
    },
    showFileExport: {
      type: Boolean,
      default: false,
    },
    selectedUser: Object,
  },
  methods: {
    selectUser(user) {
      this.$emit("userSelected", user);
    },
  },
  computed: {
    mappedDataForExport() {
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
      return data
    },
  },
};
</script>
<style scoped>

.user-export-container {
  margin-top: 20px;
  flex-grow: 0;
}

.user-list-box {
  height: 500px;
  width: 800px;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
}

.user-list-box::-webkit-scrollbar {
  width: 8px;
}

.user-list-box::-webkit-scrollbar-thumb {
  background-color: #555;
}

.user-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777;
}

</style>
