<template>
  <div class="d-flex align-center flex-column">
    <v-card
        :class="{ 'selected': isSelected }"
        @click="selectQuestion"
        width="500"
        elevation="20">
      <v-card-item>
        <v-card-title>
          Fragestellung: {{ question.question_text }}
        </v-card-title>
      </v-card-item>

      <div class="content">
        <v-card-text>
          Art: {{ questionTypeText }}
        </v-card-text>
        <v-card-text>
          Anzahl Antworten: {{ question.responses.length }}
        </v-card-text>

      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    questionTypeText() {
      if (this.question.type === 1) {
        return "Freitext";
      } else if (this.question.type === 2) {
        return "Dropdown";
      } else if (this.question.type === 3) {
        return "Checkbox";
      } else {
        return "Unbekannt";
      }
    },
  },
  methods: {
    selectQuestion() {
      this.$emit('questionSelected', this.question);
    },
  }
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
