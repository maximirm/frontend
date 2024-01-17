<template>
  <div class="create-survey-page">
    <h2>Survey Erstellen</h2>

    <InputLabel label="Titel:" :model="title" input-id="title" />
    <InputLabel label="Beschreibung:" :model="description" input-id="description" />

    <BaseButton :clickHandler="emitCreateSurveyEvent" :button-text="'Survey erstellen'" />
    <BaseButton :clickHandler="goToEditorPage" :button-text="'Zurück zur Editorseite'" />


  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}


</style>
