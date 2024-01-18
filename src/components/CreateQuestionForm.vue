<template>
  <div class="create-question-form">
    <h2>Frage Erstellen</h2>
    <DropdownMenu
        :title="'Art'"
        :options="dropdownOptions"
        :selectedOption="questionTypeText"
        @update:selectedOption="updateQuestionType"
    />

    <InputLabel label="Fragestellung:" :model="questionText" input-id="questionText" @update:model="updateText"/>

    <div v-if="questionType === 2 || questionType === 3">
      <InputLabel label="Option 1:" :model="option1" input-id="option1" @update:model="updateO1"/>
      <InputLabel label="Option 2:" :model="option2" input-id="option2" @update:model="updateO2"/>
      <InputLabel label="Option 3:" :model="option3" input-id="option3" @update:model="updateO3"/>
    </div>

    <BaseButton :clickHandler="emitCreateQuestionEvent" :button-text="'Frage erstellen'"/>
    <div v-if="creationError" class="error-message">
      {{ creationError }}
    </div>
    <div v-if="creationSuccess" class="success-message">
      Frage erfolgreich erstellt!
    </div>
    <BaseButton :clickHandler="goToEditorPage" :button-text="'Erstellung der Umfrage abschließen'"/>


  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import BaseButton from "@/components/BaseButton.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  components: {
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
    };
  },
  methods: {
    goToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },
    updateText(newVal) {
      this.questionText = newVal
      this.creationError = null
      this.creationSuccess = null
    },
    updateO1(newVal) {
      this.option1 = newVal
      this.creationError = null
      this.creationSuccess = null

    },
    updateO2(newVal) {
      this.option2 = newVal
      this.creationError = null
      this.creationSuccess = null

    },
    updateO3(newVal) {
      this.option3 = newVal
      this.creationError = null
      this.creationSuccess = null

    },
    emitCreateQuestionEvent() {
      if (this.questionType === 1 && this.questionText.trim() === "") {
        this.creationError = `Bitte alle Felder ausfüllen`;
        return
      }
      if (this.questionType === 2 || this.questionType === 3) {
        if (this.questionText.trim() === "" ||
            this.option1.trim() === "" ||
            this.option2.trim() === "" ||
            this.option3.trim() === "") {
          this.creationError = `Bitte alle Felder ausfüllen`;
          return
        }
      }
      const questionData = {
        questionType: this.questionType,
        questionText: this.questionText,
        options: [],
      };

      if (this.questionType === 2 || this.questionType === 3) {
        questionData.options.push(this.option1, this.option2, this.option3);
      }

      this.$emit("create-question", questionData);
      this.creationSuccess = `Frage erfolgreich erstellt`;
      setTimeout(() => this.creationSuccess = '', 3000); // Meldung nach 3 Sekunden ausblenden

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

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
