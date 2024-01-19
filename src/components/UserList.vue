<template>
  <div>
    <div class="user-list-box">
      <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          :isSelected="selectedUser && user.id === selectedUser.id"
          @userSelected="selectUser"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";

export default {
  components: {
    UserInfo,
  },
  props: {
    users: Array,
    selectedUser: Object,
  },
  methods: {
    selectUser(user) {
      this.$emit("userSelected", user);
    },
  },
};
</script>
<style scoped>

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
