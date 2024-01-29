<template>
  <div class="create-survey-form">
    <div class="input">
      <h2>Umfrage Erstellen</h2>
      <InputField
          :key="key"
          :label="'Titel:'"
          :response="title"
          @update:response="updateTitle"/>
      <InputField
          :key="key"
          :label="'Beschreibung:'"
          :response="description"
          @update:response="updateDescription"/>
      <DropdownMenu
          :key="key"
          :label="'Sichtbarkeit'"
          :options="visibilityOptions"
          :selectedOption="selectedVisibility"
          @update:selectedOption="updateVisibility"/>

    </div>
    <StyledButton
        :onClickMethod="emitCreateSurveyEvent"
        :label="'Umfrage erstellen'"
        :isDisabled=" !title || !description || !selectedVisibility"
        :class="'green-btn'"/>
  </div>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";
import InputField from "@/components/generic/InputField.vue";
import DropdownMenu from "@/components/generic/DropdownMenu.vue";

export default {
  components: {
    DropdownMenu,
    InputField,
    StyledButton,
  },
  data() {
    return {
      title: null,
      description: null,
      isPublic: false,
      selectedVisibility: null,
      visibilityOptions: ['Angemeldete Nutzer', 'Öffentlich'],
      key: 0,
    };
  },
  methods: {
    updateTitle(newVal) {
      this.title = newVal
    },
    updateDescription(newVal) {
      this.description = newVal
    },
    updateVisibility(newVal) {
      this.selectedVisibility = newVal
      this.isPublic = newVal === 'Öffentlich'
    },

    emitCreateSurveyEvent() {
      this.$emit('create-survey', {
        title: this.title,
        description: this.description,
        isPublic: this.isPublic
      });
      this.key++
    },
  },
};
</script>

<style scoped>

.input {
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
