<template>
  <div class="d-flex align-center flex-column">
    <v-card
        :class="{ 'selected': isSelected }"
        @click="selectUser"
        width="700"
        elevation="16">
      <v-card-item>
        <v-card-title>
          Username: {{ user.name }}
        </v-card-title>
      </v-card-item>

      <div class="content">
        <v-card-text>
          Rolle: {{ user.role }}
        </v-card-text>
        <v-card-text>
          Anzahl Umfragen: {{ user.numberOfSurveys }}
        </v-card-text>

      </div>
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

.content {

  display: flex;

}

.v-card {
  background-color: rgba(124, 139, 152, 0.6); /* Helles, gedämpftes Blau */
  color: #333333; /* Dunkelgrau für bessere Lesbarkeit */
}


.v-card.selected {
  background-color: #3E5A71; /* Dunkles Blau */
  color: #FFFFFF; /* Weiß */
}

</style>
