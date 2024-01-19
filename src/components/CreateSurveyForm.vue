<template>
  <div class="create-survey-page">
    <h2>Umfrage Erstellen</h2>
    <InputLabel
        :label="'Titel:'"
        :model="title"
        :input-id="'title'"
        @update:model="updateTitle"/>
    <InputLabel
        :label="'Beschreibung:'"
        :model="description"
        :input-id="'description'"
        @update:model="updateDescription"/>
    <BaseButton
        :click-handler="emitCreateSurveyEvent"
        :button-text="'Umfrage erstellen'"
        :is-disabled="title === '' || description === ''"/>
    <BaseButton
        :clickHandler="goToEditorPage"
        :button-text="'Zurück'"/>
    <LogoutButton/>
  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import BaseButton from "@/components/BaseButton.vue";
import LogoutButton from "@/components/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
    InputLabel,
    BaseButton,
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
    goToEditorPage() {
      this.$router.push({ name: 'EditorPage' });
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
.create-survey-page {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #333;
  color: #fff;
}
</style>
