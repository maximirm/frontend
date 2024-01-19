<template>
  <div id="app">
    <div class="header">
      <LogoutButton /> <!-- Hier den Logout-Button einfügen -->
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  display: grid;
  grid-template-rows: auto 1fr; /* Erste Zeile für den Header, zweite Zeile für den Hauptinhalt */
  grid-template-columns: 1fr; /* Eine Spalte für den gesamten Inhalt */
  width: 100%;
  height: 100%;
  background-color: #333;
  margin-bottom: 20px;
  overflow: hidden; /* Scrollbars verbergen */
}

.header {
  grid-row: 1; /* Header in der ersten Zeile */
  grid-column: 1; /* Header in der ersten Spalte */
  display: flex;
  justify-content: flex-end; /* Logout-Button rechts ausrichten */
}

.main-content {
  grid-row: 2; /* Hauptinhalt in der zweiten Zeile */
  grid-column: 1; /* Hauptinhalt in der ersten Spalte */
  padding: 10px;
  color: #fff;
  overflow: hidden;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Scrollbars verbergen */
}
</style>

<script setup>
import LogoutButton from "@/components/LogoutButton.vue";
</script>
