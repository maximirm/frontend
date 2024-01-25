<template>
  <div>
    <div class="response-form">
      <template v-if="question.type === 1">
        <InputField
            :label="question.question_text"
            :response="response"
            @update:response="updateFreeTextResponse"/>
      </template>

      <template v-else-if="question.type === 2">
        <DropdownMenu
            :label="question.question_text"
            :options="question.options"
            :selectedOption="responseText"
            @update:selectedOption="updateDropdownResponse"/>
      </template>

      <template v-else-if="question.type === 3">
        <CheckBox
            :title="question.question_text"
            :options="question.options"
            :selectedOptions="responseText"
            @update:selectedOptions="handleCheckBoxResponse"/>
      </template>

      <StyledButton
          :label="'Antwort speichern'"
          :onClickMethod="submitResponse"
          :isDisabled="responseText.length === 0"
          :class="'green-btn'"/>
    </div>
  </div>
</template>

<script>
import DropdownMenu from "@/components/general/DropdownMenu.vue";
import CheckBox from "@/components/general/CheckBox.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import InputField from "@/components/general/InputField.vue";
import {postResponse} from "@/scripts/api/surveyApi";

export default {
  components: {
    InputField,
    StyledButton,
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
      this.response = newResponse;
      this.responseText = [newResponse];
    },
    updateDropdownResponse(newResponse) {
      this.responseText = [newResponse];
    },
    handleCheckBoxResponse(newResponse) {
      this.responseText = newResponse;
    },
    submitResponse() {
      this.saveResponse();
      this.$emit("responseTextSubmitted");

    },
    async saveResponse() {

      try {
        const response = {
          question_id: this.question.id,
          respondent_id: this.$store.state.userId !== null ? this.$store.state.userId : null,
          response_text: this.responseText,
        };
        await postResponse(response);

      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.response-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
