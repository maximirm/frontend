<template>
  <StyledCatalog
      :label="label">
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
import StyledCatalog from "@/components/general/StyledCatalog.vue";

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
  computed:{
    label() {
      return this.users.length > 0 ? 'Benutzer' : ''
    }
  },
  methods: {
    selectUser(user) {
      this.$emit("userSelected", user);
    },
  },
};
</script>
