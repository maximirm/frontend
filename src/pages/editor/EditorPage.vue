<template>
  <div class="editor-page">
    <h2>Editor</h2>
    <GroupedButtons
        :buttons="buttons"/>
    <LogoutButton/>
  </div>
</template>

<script>
import LogoutButton from "@/components/buttons/LogoutButton.vue";
import GroupedButtons from "@/components/buttons/GroupedButtons.vue";

export default {
  components: {
    GroupedButtons,
    LogoutButton,
  },
  computed: {
    buttons() {
      return [
        {text: 'Meine Umfragen', clickHandler: this.redirectToAnalyseSurveyPage, class: 'green-btn'},
        {text: 'Umfrage Erstellen', clickHandler: this.redirectToCreateSurveyPage, class: 'green-btn'},
      ];
    },
  },
  methods: {
    redirectToCreateSurveyPage() {
      this.$router.push({name: 'CreateSurveyPage'});
    },
    redirectToAnalyseSurveyPage() {
      this.$router.push({name: 'AnalyseSurveyPage'});
    },
  },
};
</script>

<style scoped>

.editor-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

</style>
