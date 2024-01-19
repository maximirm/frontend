<template>
  <div>
    <div class="form-container">
      <template v-if="question.type === 1">
        <!-- Frage mit Typ 1 (Input) -->
        <InputLabel :label="question.question_text" :model="response" :inputId="question.id"
                    @update:model="updateFreeTextResponse"/>
      </template>
      <template v-else-if="question.type === 2">
        <!-- Frage mit Typ 2 (Dropdown) -->
        <DropdownMenu :title="question.question_text" :options="question.options" :selectedOption="responseText"
                      @update:selectedOption="updateDropdownResponse"/>
      </template>
      <template v-else-if="question.type === 3">
        <!-- Frage mit Typ 3 (Checkbox) -->
        <CheckBox :title="question.question_text" :options="question.options" :selectedOptions="responseText"
                  @update:selectedOptions="handleCheckBoxResponse"/>
      </template>

      <BaseButton
          :buttonText="'Antwort speichern'"
          :clickHandler="submitResponse"
          :is-disabled="responseText.length === 0"
          :class="'respond-btn'"
      />
    </div>
  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import CheckBox from "@/components/CheckBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import axios from "axios";

export default {
  components: {
    BaseButton,
    InputLabel,
    DropdownMenu,
    CheckBox,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      responseText: [],
      response: '',
    };
  },
  methods: {
    updateFreeTextResponse(newResponse) {
      this.response = newResponse
      this.responseText = [newResponse]
    },
    updateDropdownResponse(newResponse) {
      this.responseText = [newResponse]
    },
    handleCheckBoxResponse(newResponse) {
      this.responseText = newResponse;
    },
    submitResponse() {
      console.log("submit: ", this.responseText)
      this.saveResponse()
      this.$emit("responseTextSubmitted");
      this.responseText = [];
      this.response = '';
    },
    async saveResponse() {
      try {
        const response = {
          question_id: this.question.id,
          respondent_id: this.isAnonymous ? null : this.$store.state.userId,
          response_text: this.responseText
        };
        await axios.post('http://127.0.0.1:8002/responses/', response);
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.respond-btn {
  background-color: #4CAF50;
  margin-top: 10px;
}

.respond-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
