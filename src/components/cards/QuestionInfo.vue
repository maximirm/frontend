<template>
  <div
      :class="{ 'selected-question': isSelected }"
      @click="selectQuestion">
    <div class="question-item">
      <div class="question-info">
        <div class="key-value-pair">
          <p v-if="question.type === 1">Freitext</p>
          <p v-else-if="question.type === 2">Dropdown</p>
          <p v-else-if="question.type === 3">Checkbox</p>
          <p>{{ question.responses.length }} Antworten</p>
        </div>

        <div class="key-value-pair">
          <p>{{ question.question_text }}</p>
        </div>

        <div class="key-value-pair" v-if="question.options.length > 0">
          <p>1. {{ question.options[0] }}</p>
          <p>2. {{ question.options[1] }}</p>
          <p>3. {{ question.options[2] }}</p>
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
