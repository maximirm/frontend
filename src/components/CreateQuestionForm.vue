<template>
  <div class="create-question-form">
    <h2>Frage Erstellen</h2>
    <RadioButtonGroup
        groupTitle="Art der Frage"
        :options="questionTypes"
        :selectedOption="selectedQuestionType"
        @update:selectedOption="updateQuestionType"
    />

    <InputLabel label="Fragestellung:" :model="questionText" input-id="questionText" />

    <!-- Abhängig von der ausgewählten Frageart werden die Antwortmöglichkeiten angezeigt -->
    <div v-if="selectedQuestionType === 'RadioButton' || selectedQuestionType === 'Checkbox'">
      <InputLabel label="Antwortmöglichkeit 1:" :model="option1" input-id="option1" />
      <InputLabel label="Antwortmöglichkeit 2:" :model="option2" input-id="option2" />
      <InputLabel label="Antwortmöglichkeit 3:" :model="option3" input-id="option3" />
    </div>

    <BaseButton :clickHandler="emitCreateQuestionEvent" :button-text="'Create Question'" />
  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import BaseButton from "@/components/BaseButton.vue";
import RadioButtonGroup from "@/components/RadioButtonGroup.vue";

export default {
  components: {
    RadioButtonGroup,
    InputLabel,
    BaseButton,
  },
  data() {
    return {
      questionTypes: [
        { label: "Freitext", value: "Freitext" },
        { label: "RadioButton", value: "RadioButton" },
        { label: "Checkbox", value: "Checkbox" },
      ],
      selectedQuestionType: "Freitext",
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
    };
  },
  methods: {
    emitCreateQuestionEvent() {
      const questionData = {
        questionType: this.selectedQuestionType,
        questionText: this.questionText,
        options: [],
      };

      if (this.selectedQuestionType === "RadioButton" || this.selectedQuestionType === "Checkbox") {
        questionData.options.push(this.option1, this.option2, this.option3);
      }

      this.$emit("create-question", questionData);
    },
    updateQuestionType(selectedOption) {
      this.selectedQuestionType = selectedOption;
    },
  },
};
</script>

<style scoped>
.create-question-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

/* Fügen Sie hier weiteres Styling hinzu, um die Radio-Buttons und Eingabefelder nach Ihren Vorstellungen zu gestalten */
</style>
