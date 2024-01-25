<template>
  <div class="create-question-form">
    <h2>Frage Erstellen</h2>
    <DropdownMenu
        :title="'Art'"
        :options="dropdownOptions"
        :selectedOption="questionTypeText"
        @update:selectedOption="updateQuestionType"/>
    <InputField
        :label="'Fragestellung:'"
        :model="questionText"
        @update:model="updateText"/>

    <div v-if="questionType === 2 || questionType === 3">
      <InputField
          :label="'Option 1:'"
          :model="option1"
          @update:model="updateO1"/>
      <InputField
          :label="'Option 2:'"
          :model="option2"
          @update:model="updateO2"/>
      <InputField
          :label="'Option 3:'"
          :model="option3"
          @update:model="updateO3"/>
    </div>

    <StyledButton
        :onClickMethod="emitCreateQuestionEvent"
        :label="'Frage erstellen'"
        :class="'green-btn'"/>

    <FeedbackMessage
        v-if="creationAttempted"
        :messageType="creationError ? 'error' : 'success'"
        :message="creationError ? creationError : 'Frage erfolgreich erstellt!'"/>
    <StyledButton
        :onClickMethod="goToEditorPage"
        :label="'abschließen'"
        :class="'green-btn'"/>

  </div>
</template>

<script>
import DropdownMenu from "@/components/general/DropdownMenu.vue";
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import InputField from "@/components/general/InputField.vue";

export default {
  components: {
    InputField,
    StyledButton,
    FeedbackMessage,
    DropdownMenu,
  },
  computed: {
    dropdownOptions() {
      return ['Freitext', 'Dropdown', 'Checkbox']
    },
  },
  data() {
    return {
      questionType: 1,
      questionTypeText: 'Freitext',
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      creationError: null,
      creationSuccess: null,
      creationAttempted: false,
    };
  },
  methods: {
    emitCreateQuestionEvent() {
      this.creationAttempted = true;
      if (!this.inputIsValid()) {
        this.setCreationFeedback(false);
        return;
      }

      const questionData = {
        questionType: this.questionType,
        questionText: this.questionText,
        options: [],
      };

      if (!this.isFreetextQuestion()) {
        questionData.options.push(this.option1, this.option2, this.option3);
      }

      this.$emit("create-question", questionData);
      this.setCreationFeedback(true);
    },
    setCreationFeedback(success) {
      success ?
          this.creationSuccess = `Frage erfolgreich erstellt` :
          this.creationError = "Bitte alle Felder ausfüllen";
      setTimeout(() => {
        this.creationAttempted = false;
        this.creationSuccess = '';
        this.creationError = '';
      }, 2000);
    },
    updateQuestionType(selectedOption) {
      this.questionTypeText = selectedOption;
      switch (selectedOption) {
        case "Freitext":
          this.questionType = 1;
          break;
        case "Dropdown":
          this.questionType = 2;
          break;
        case "Checkbox":
          this.questionType = 3;
          break;
        default:
          console.log('error updating question type')
      }
    },
    isFreetextQuestion() {
      return this.questionType === 1;
    },
    inputIsValid() {
      if (this.isFreetextQuestion() &&
          this.questionTextIsEmpty()) {
        return false;
      }
      return !(!this.isFreetextQuestion() &&
          (this.questionTextIsEmpty() || this.optionsAreEmpty()));
    },
    optionsAreEmpty() {
      return this.option1.trim() === "" ||
          this.option2.trim() === "" ||
          this.option3.trim() === "";
    },
    questionTextIsEmpty() {
      return this.questionText.trim() === "";
    },
    goToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },
    updateText(newVal) {
      this.questionText = newVal;
      this.resetMessage();
    },
    updateO1(newVal) {
      this.option1 = newVal;
      this.resetMessage();
    },
    updateO2(newVal) {
      this.option2 = newVal;
      this.resetMessage();
    },
    updateO3(newVal) {
      this.option3 = newVal;
      this.resetMessage();
    },
    resetMessage() {
      this.creationAttempted = false;
      this.creationError = null;
      this.creationSuccess = null;
    },
  },
};
</script>

<style scoped>

.create-question-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

</style>
