<template>
  <div class="d-flex align-center flex-column">
    <v-card
        :class="{ 'selected': isSelected }"
        @click="selectQuestion"
        class="question-card"
        flat>
      <v-card-text>
        <div class="card-content">
          <h2>{{ question.question_text }}</h2>
          <p class="caption">Art: {{ questionTypeText }}</p>
          <p class="caption">Anzahl Antworten: {{ question.responses.length }}</p>
        </div>
      </v-card-text>
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

.question-card {
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
