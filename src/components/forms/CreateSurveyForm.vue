<template>
  <div class="create-survey-form">
    <h2>Umfrage Erstellen</h2>
    <InputField
        :label="'Titel:'"
        :model="title"
        :inputId="'title'"
        @update:model="updateTitle"/>
    <InputField
        :label="'Beschreibung:'"
        :model="description"
        :inputId="'description'"
        @update:model="updateDescription"/>
    <StyledButton
        :onClickMethod="emitCreateSurveyEvent"
        :label="'Umfrage erstellen'"
        :isDisabled="title === '' || description === ''"
        :class="'green-btn'"/>
    <StyledButton
        :onClickMethod="redirectToEditorPage"
        :label="'Zurück'"/>
    <LogoutButton/>
  </div>
</template>

<script>
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import InputField from "@/components/general/InputField.vue";

export default {
  components: {
    InputField,
    StyledButton,
    LogoutButton,
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
    redirectToEditorPage() {
      this.$router.push({name: 'EditorPage'});
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

.create-survey-form {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #333;
  color: #fff;
}

</style>
