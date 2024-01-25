<template>
  <div class="create-survey-form">
    <div class="input">
      <h2>Umfrage Erstellen</h2>
      <InputField
          :label="'Titel:'"
          :model="title"
          @update:model="updateTitle"/>
      <InputField
          :label="'Beschreibung:'"
          :model="description"
          @update:model="updateDescription"/>
    </div>
    <StyledButton
        :onClickMethod="emitCreateSurveyEvent"
        :label="'Umfrage erstellen'"
        :isDisabled="title === '' || description === ''"
        :class="'green-btn'"/>

  </div>
</template>

<script>
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import InputField from "@/components/general/InputField.vue";

export default {
  components: {
    InputField,
    StyledButton,
  },
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    updateTitle(newVal) {
      this.title = newVal
    },
    updateDescription(newVal) {
      this.description = newVal
    },

    emitCreateSurveyEvent() {
      this.$emit('create-survey', {
        title: this.title,
        description: this.description,
      });
    },
  },
};
</script>

<style scoped>

.input{
  margin-bottom: 5px;
}



.create-survey-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

}

</style>
