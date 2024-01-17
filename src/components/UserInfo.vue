<template>
  <div :class="{ 'selected-user': isSelected }" @click="selectUser">
    <div class="user-item">
      <div class="user-info">
        <div class="key-value-pair">
          <p>Name:</p>
          <p>{{ user.name }}</p>
        </div>
        <div class="key-value-pair">
          <p>Rolle:</p>
          <p>{{ user.role }}</p>
        </div>
        <div class="key-value-pair">
          <p>Anzahl der Umfragen:</p>
          <p>{{ user.numberOfSurveys }}</p>
        </div>
        <div class="key-value-pair">
          <p>ID:</p>
          <p>{{ user.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
export default {
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
.key-value-pair p {
  margin: 1px 0; /* Verringern Sie den vertikalen Abstand zwischen den Zeilen */
  padding: 2px; /* Optional können Sie auch das Padding anpassen */
  color: #ccc;
  text-overflow: ellipsis;
}

.user-item {
  border: 2px solid #666;
  padding: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.user-info {
  display: flex;
  justify-content: flex-start;
}

.key-value-pair {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 15px;
  width: 200px; /* Feste Breite für jedes Paar */
}


.selected-user {
  background-color: #2e2e2e;
  color: #4CAF50;
  border-left: 4px solid #4CAF50;
}
</style>
