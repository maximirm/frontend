<template>
  <v-container>
    <v-card class="user-catalog" outlined>
      <v-list class="user-list">
        <UserCard
            v-for="(user, index) in users"
            :key="index"
            :user="user"
            :isSelected="selectedUser && user.id === selectedUser.id"
            @userSelected="selectUser(user)"/>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import UserCard from "@/components/cards/UserCard.vue";

export default {
  components: {
    UserCard,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    selectedUser: {
      type: Object,
    },
  },
  computed: {
    label() {
      return this.users.length > 0 ? 'Benutzer' : '';
    }
  },
  methods: {
    selectUser(user) {
      this.$emit("userSelected", user);
    },
  },
};
</script>

<style scoped>

.user-catalog {
  max-height: 400px;
  overflow-y: auto;
}

.user-list {
  padding: 0;
}

.user-catalog::-webkit-scrollbar {
  width: 10px;
}

.user-catalog::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

</style>
