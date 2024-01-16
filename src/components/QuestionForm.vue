<!-- FrageFormular.vue -->

<template>
  <form @submit.prevent="submitForm">


    <label for="questionType">Frage:</label>
    <select v-model="questionType" @change="updateAnswerFields">
      <option value="freetext">Freitext</option>
      <option value="checkbox">Checkbox</option>
      <option value="radiobutton">Radiobutton</option>
    </select>

    <label for="questionText">Fragetext:</label>
    <input v-model="questionText" type="text" id="questionText" required />

    <label v-if="questionType !== 'freetext'" for="answer1">Antwortmöglichkeit 1:</label>
    <input v-if="questionType !== 'freetext'" v-model="answer1" type="text" id="answer1" :disabled="questionType === 'freetext'" />

    <label v-if="questionType !== 'freetext'" for="answer2">Antwortmöglichkeit 2:</label>
    <input v-if="questionType !== 'freetext'" v-model="answer2" type="text" id="answer2" :disabled="questionType === 'freetext'" />

    <label v-if="questionType !== 'freetext'" for="answer3">Antwortmöglichkeit 3:</label>
    <input v-if="questionType !== 'freetext'" v-model="answer3" type="text" id="answer3" :disabled="questionType === 'freetext'" />

    <button type="submit">Frage hinzufügen</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      questionText: '',
      questionType: 'freetext',
      answer1: '',
      answer2: '',
      answer3: '',
    };
  },
  methods: {
    submitForm() {
      this.$emit('form-submitted', {
        questionText: this.questionText,
        questionType: this.questionType,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
      });
    },
    updateAnswerFields() {
      if (this.questionType === 'freetext') {
        this.answer1 = '';
        this.answer2 = '';
        this.answer3 = '';
      }
    },
  },
};
</script>

<style scoped>

label {
  margin-top: 10px;
  display: block;
}

input, select {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
