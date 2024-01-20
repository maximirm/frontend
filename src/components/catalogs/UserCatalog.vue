<template>
  <StyledCatalog>
    <UserCard
        v-for="(user, index) in users"
        :key="index"
        :user="user"
        :isSelected="selectedUser && user.id === selectedUser.id"
        @userSelected="selectUser(user)"/>
  </StyledCatalog>
</template>

<script>
import UserCard from "@/components/cards/UserCard.vue";
import StyledCatalog from "@/components/catalogs/StyledCatalog.vue";

export default {
  components: {
    StyledCatalog,
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
  methods: {
    selectUser(user) {
      this.$emit("userSelected", user);
    },
  },
};
</script>
