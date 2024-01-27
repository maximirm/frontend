<template>
  <div class="d-flex align-center flex-column">
    <v-card
        :class="{ 'selected': isSelected }"
        @click="selectUser"
        class="user-card"
        flat>

      <v-card-text>
        <div class="card-content">
          <h2>{{ user.name }}</h2>
          <p class="caption">Rolle: {{ user.role }}</p>
          <p class="caption">Anzahl Umfragen: {{ user.numberOfSurveys }}</p>
        </div>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    selectUser() {
      this.$emit('userSelected', this.user);
    },
  },
};
</script>

<style scoped>
.user-card {
  width: 400px;
  height: 80px;
  transition: background-color 0.3s;
  background-color: rgba(67, 154, 217, 0.15);
}

.selected {
  background-color: rgba(67, 154, 217, 0.5);
  color: #1A237E;
}

.card-content h2 {
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 1em;
}

.caption {
  font-size: 0.8rem;
  color: #1A237E;
  margin: 0;
}
</style>

