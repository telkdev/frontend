<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar
        ><ion-title>Game Room: {{ gameId }}</ion-title></ion-toolbar
      >
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="!gameState">Waiting for opponent...</div>
      <div v-else>
        <p>Turns Played: {{ gameState.turns.length }}</p>
        <ion-button @click="makeMove">Make Move</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGame } from "@/composables/useGame";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";

const route = useRoute();
const gameId = ref<string>(route.params.gameId as string);
const { socket, playTurn, gameState } = useGame();

// onMounted(() => {
//   joinGame(gameId.value);
// });

const makeMove = () => {
  if (!gameState.value) return;
  playTurn(gameId.value, {
    player: "X",
    position: `Move ${gameState.value.turns.length + 1}`,
  });
};

socket.on("update-game", (game: any) => {
  console.log("Received game update:", game);
  gameState.value = game;
});
</script>
