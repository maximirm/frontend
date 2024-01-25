<template>
  <v-card class="mx-auto" max-height="500" style="overflow-y: auto;">
    <v-list
        density="compact"
        style="background: transparent; margin: 0; padding: 0;">

    <UserCard
        v-for="(user, index) in users"
        :key="index"
        :user="user"
        :isSelected="selectedUser && user.id === selectedUser.id"
        @userSelected="selectUser(user)"
    />
    </v-list>
  </v-card>
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
<style scoped>
.v-card::-webkit-scrollbar {
  width: 0; /* Breite der Scrollleiste auf 0 setzen */
}

.v-card::-webkit-scrollbar-thumb {
  background-color: transparent; /* Daumen (Thumb) der Scrollleiste transparent machen */
}
</style>
