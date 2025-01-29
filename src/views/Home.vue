<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar><ion-title>1v1 Turn-Based Game</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input v-model="gameId" placeholder="Enter Game ID"></ion-input>
      <ion-button :disabled="!gameId" @click="createGame">Create Game</ion-button>
      <ion-button :disabled="!gameId" @click="joinGame">Join Game</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGame } from "@/composables/useGame";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
} from "@ionic/vue";

const { createGame: create, joinGame: join } = useGame();
const gameId = ref<string>("");
const router = useRouter();

const createGame = () => {
  if (!gameId.value) return;
  create(gameId.value);
  router.push(`/game/${gameId.value}`);
};

const joinGame = () => {
  if (!gameId.value) return;
  join(gameId.value);
  router.push(`/game/${gameId.value}`);
};
</script>
