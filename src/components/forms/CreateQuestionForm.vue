<template>
  <div class="create-question-form">
    <h2>Frage Erstellen</h2>
    <DropdownMenu
        :label="'Art'"
        :options="dropdownOptions"
        :selectedOption="questionTypeText"
        @update:selectedOption="updateQuestionType"/>
    <InputField
        :key="key"
        :label="'Fragestellung:'"
        :response="questionText"
        @update:response="updateQuestionText"/>

    <div v-if="questionType === 2 || questionType === 3">
      <InputField
          :key="key"
          :label="'Option 1:'"
          :response="firstOption"
          @update:response="updateFirstOption"/>
      <InputField
          :key="key"
          :label="'Option 2:'"
          :response="secondOption"
          @update:response="updateSecondOption"/>
      <InputField
          :key="key"
          :label="'Option 3:'"
          :response="thirdOption"
          @update:response="updateThirdOption"/>
    </div>

    <div class="button-container">
      <StyledButton
          :onClickMethod="emitCreateQuestionEvent"
          :label="'Frage erstellen'"
          :class="'green-btn'"/>
      <FeedbackMessageWrapper>
        <FeedbackMessage
            v-if="creationAttempted"
            :messageType="creationError ? 'error' : 'success'"
            :message="creationError ? creationError : 'Frage erfolgreich erstellt!'"/>
      </FeedbackMessageWrapper>
      <StyledButton
          :onClickMethod="goToEditorPage"
          :label="'abschließen'"
          :class="'green-btn'"/>
    </div>
  </div>
</template>

<script>
import DropdownMenu from "@/components/generic/DropdownMenu.vue";
import FeedbackMessage from "@/components/generic/FeedbackMessage.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import InputField from "@/components/generic/InputField.vue";
import FeedbackMessageWrapper from "@/components/generic/FeedbackMessageWrapper.vue";

export default {
  components: {
    FeedbackMessageWrapper,
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
      firstOption: "",
      secondOption: "",
      thirdOption: "",
      creationError: null,
      creationSuccess: null,
      creationAttempted: false,
      key: 0,
    };
  },
  methods: {
    updateQuestionText(newVal) {
      this.questionText = newVal;
      this.resetMessage();
    },
    updateFirstOption(newVal) {
      this.firstOption = newVal;
      this.resetMessage();
    },
    updateSecondOption(newVal) {
      this.secondOption = newVal;
      this.resetMessage();
    },
    updateThirdOption(newVal) {
      this.thirdOption = newVal;
      this.resetMessage();
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
          console.error('error updating question type');
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
      return this.firstOption.trim() === "" ||
          this.secondOption.trim() === "" ||
          this.thirdOption.trim() === "";
    },
    questionTextIsEmpty() {
      return this.questionText.trim() === "";
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
    resetMessage() {
      this.creationAttempted = false;
      this.creationError = null;
      this.creationSuccess = null;
    },
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
        questionData.options.push(this.firstOption, this.secondOption, this.thirdOption);
      }
      this.$emit("create-question", questionData);
      this.key++;
      this.setCreationFeedback(true);
    },
    goToEditorPage() {
      this.$router.push({name: 'EditorPage'});
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

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

</style>
