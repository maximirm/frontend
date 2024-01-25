<template>
  <div class="d-flex align-center flex-column">
    <v-card
        :class="{ 'selected': isSelected }"
        @click="selectSurvey"
        width="500"
        elevation="16">
      <v-card-item>
        <v-card-title>
          Titel: {{ survey.title }}
        </v-card-title>
      </v-card-item>

      <div class="content">
        <v-card-text>
          Beschreibung: {{ survey.description }}
        </v-card-text>
        <v-card-text>
          Anzahl Fragen: {{ survey.questions.length }}
        </v-card-text>

      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'SurveyCard',
  props: {
    survey: {
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
    selectSurvey() {
      this.$emit('surveySelected', this.survey);
    },
  },
};
</script>

<style scoped>

.content {

  display: flex;

}

.v-card {
  background-color: rgba(124, 139, 152, 0.4); /* Helles, gedämpftes Blau */
  color: #333333; /* Dunkelgrau für bessere Lesbarkeit */
}


.v-card.selected {
  background-color: #3E5A71; /* Dunkles Blau */
  color: #FFFFFF; /* Weiß */
}

</style>
