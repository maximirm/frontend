<template>
  <div>
    <div class="response-form">
      <template v-if="question.type === 1">
        <InputLabel
            :label="question.question_text"
            :model="response"
            :inputId="question.id"
            @update:model="updateFreeTextResponse"/>
      </template>

      <template v-else-if="question.type === 2">
        <DropdownMenu
            :title="question.question_text"
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
import InputLabel from "@/components/general/InputLabel.vue";
import DropdownMenu from "@/components/general/DropdownMenu.vue";
import CheckBox from "@/components/general/CheckBox.vue";
import StyledButton from "@/components/buttons/StyledButton.vue";
import {postResponse} from "@/scripts/api/surveyApi";

export default {
  components: {
    StyledButton,
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
      console.log("submit: ", this.responseText);
      this.saveResponse();
      this.$emit("responseTextSubmitted");
      this.responseText = [];
      this.response = '';
    },
    async saveResponse() {
      try {
        const response = {
          question_id: this.question.id,
          respondent_id: this.respondentIsAnonymous ? null : this.$store.state.userId,
          response_text: this.responseText,
        };
        await postResponse(response);
      } catch (error) {
        console.log(error);
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
