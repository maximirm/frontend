<template>
  <div :class="{ 'selected-survey': isSelected }" @click="selectSurvey">
    <div class="survey-item">
      <div class="survey-info">
        <div class="key-value-pair">
          <p>{{ survey.title }}</p>
        </div>
        <div class="key-value-pair">
          <p>{{ survey.description }}</p>
        </div>
        <div class="key-value-pair">
          <p>{{ survey.questions.length }} Fragen</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
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
.key-value-pair p {
  margin: 1px 0;
  padding: 2px;
  color: #ccc;
  text-overflow: ellipsis;
}

.survey-item {
  border: 2px solid #666;
  padding: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.survey-info {
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


.selected-survey {
  background-color: #2e2e2e;
  color: #4CAF50;
  border-left: 4px solid #4CAF50;
}
</style>
