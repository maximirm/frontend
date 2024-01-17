<template>
  <div>
    <div class="question-item">
      <div class="question-info">
        <!-- Key-Value Paar für jeden Eintrag -->
        <div class="key-value-pair">
          <p>Frage:</p>
          <p>{{ questionText }}</p>
        </div>
        <div class="key-value-pair">
          <p>Frageart:</p>
          <p v-if="questionType === 1">Freitext</p>
          <p v-else-if="questionType === 2">RadioButton</p>
          <p v-else-if="questionType === 3">Checkbox</p>
        </div>
        <div class="key-value-pair" v-if="options.length > 0">
          <p>Antwortmöglichkeiten:</p>
          <ul>
            <li v-for="(option, index) in options" :key="index">{{ option }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: Number,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
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
</style>
