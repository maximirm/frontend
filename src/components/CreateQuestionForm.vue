<template>
  <div class="create-question-form">
    <h2>Frage Erstellen</h2>
    <RadioButtonGroup
        groupTitle="Art der Frage"
        :options="questionTypes"
        :selectedOption="selectedQuestionType"
        @update:selectedOption="updateQuestionType"
    />

    <InputLabel label="Fragestellung:" :model="questionText" input-id="questionText" @update:model="updateText" />

    <div v-if="selectedQuestionType === 2 || selectedQuestionType === 3">
      <InputLabel label="Antwortmöglichkeit 1:" :model="option1" input-id="option1" @update:model="updateO1"/>
      <InputLabel label="Antwortmöglichkeit 2:" :model="option2" input-id="option2" @update:model="updateO2"/>
      <InputLabel label="Antwortmöglichkeit 3:" :model="option3" input-id="option3" @update:model="updateO3"/>
    </div>

    <BaseButton :clickHandler="emitCreateQuestionEvent" :button-text="'Create Question'" />
    <div v-if="creationError" class="error-message">
      {{ creationError }}
    </div>
    <BaseButton :clickHandler="goToEditorPage" :button-text="'Zurück zur Editorseite'" />


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
        { label: "Freitext", value: 1 },
        { label: "RadioButton", value: 2 },
        { label: "Checkbox", value: 3 },
      ],
      selectedQuestionType: 1,
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      creationError: null,
    };
  },
  methods: {
    goToEditorPage() {
      this.$router.push({ name: 'EditorPage' });
    },
    updateText(newVal) {
      this.questionText = newVal
      this.creationError = null
    },
    updateO1(newVal) {
      this.option1 = newVal
      this.creationError = null
    },
    updateO2(newVal) {
      this.option2 = newVal
      this.creationError = null
    },
    updateO3(newVal) {
      this.option3 = newVal
      this.creationError = null
    },
    emitCreateQuestionEvent() {
      if (this.selectedQuestionType === 1 && this.questionText.trim() === "") {
        this.creationError = `Bitte alle Felder ausfüllen`;
        return
      }
      if (this.selectedQuestionType === 2 || this.selectedQuestionType === 3) {
        if (this.questionText.trim() === "" ||
            this.option1.trim() === "" ||
            this.option2.trim() === "" ||
            this.option3.trim() === "") {
          this.creationError = `Bitte alle Felder ausfüllen`;
          return
        }
      }
      const questionData = {
        questionType: this.selectedQuestionType,
        questionText: this.questionText,
        options: [],
      };

      if (this.selectedQuestionType === 2 || this.selectedQuestionType === 3) {
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

.error-message {
  color: red;
  margin-top: 10px;
}

</style>
