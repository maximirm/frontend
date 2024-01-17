<template>
  <div :class="{ 'selected-question': isSelected }" @click="selectQuestion">

    <div class="question-item">
      <div class="question-info">
        <div class="key-value-pair">
          <p>Frage:</p>
          <p>{{ question.question_text }}</p>
        </div>
        <div class="key-value-pair">
          <p>Art der Frage:</p>
          <p v-if="question.type === 1">Freitext</p>
          <p v-else-if="question.type === 2">RadioButton</p>
          <p v-else-if="question.type === 3">Checkbox</p>
        </div>
        <div class="key-value-pair" v-if="question.options.length > 0">
          <p>Options:</p>
          <ul>
            <li v-for="(option, index) in question.options" :key="index">{{ option }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    selectQuestion() {
      this.$emit('questionSelected', this.question);
    },
  }
};
</script>

<style scoped>
.key-value-pair p {
  margin: 1px 0;
  padding: 2px;
  color: #ccc;
  text-overflow: ellipsis;
}

.question-item {
  border: 2px solid #666;
  padding: 5px;
  transition: border-color 0.3s;
}

.question-info {
  display: flex;
  justify-content: flex-start;
}

.key-value-pair {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 5px;
  width: 200px;
}
.selected-question {
  background-color: #2e2e2e;
  color: #4CAF50;
  border-left: 4px solid #4CAF50;
}
</style>
