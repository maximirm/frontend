<template>
  <div class="create-question-form">
    <h2>Frage Erstellen</h2>
    <DropdownMenu
        :title="'Art'"
        :options="dropdownOptions"
        :selectedOption="questionTypeText"
        @update:selectedOption="updateQuestionType"/>
    <InputLabel
        :label="'Fragestellung:'"
        :model="questionText"
        :input-id="'questionText'"
        @update:model="updateText"/>

    <div v-if="questionType === 2 || questionType === 3">
      <InputLabel
          :label="'Option 1:'"
          :model="option1"
          :input-id="'option1'"
          @update:model="updateO1"/>
      <InputLabel
          :label="'Option 2:'"
          :model="option2"
          :input-id="'option2'"
          @update:model="updateO2"/>
      <InputLabel
          :label="'Option 3:'"
          :model="option3"
          :input-id="'option3'"
          @update:model="updateO3"/>
    </div>

    <BaseButton
        :clickHandler="emitCreateQuestionEvent"
        :button-text="'Frage erstellen'"/>
    <FeedbackMessage
        v-if="creationAttempted"
        :message-class="creationError ? 'error' : 'success'"
        :message="creationError ? creationError : 'Frage erfolgreich erstellt!'"/>
    <BaseButton
        :clickHandler="goToEditorPage"
        :button-text="'Umfrageerstellung abschließen'"/>
    <LogoutButton/>
  </div>
</template>

<script>
import InputLabel from "@/components/utils/InputLabel.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import DropdownMenu from "@/components/utils/DropdownMenu.vue";
import FeedbackMessage from "@/components/utils/FeedbackMessage.vue";
import LogoutButton from "@/components/buttons/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
    FeedbackMessage,
    DropdownMenu,
    InputLabel,
    BaseButton,
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
  margin-top: 20px;
}

</style>
