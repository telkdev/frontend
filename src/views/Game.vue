<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding-right: 10px;
          "
        >
          <ion-title>Game Room: {{ gameId }}</ion-title>
          <ion-button @click="router.push('/')">Home</ion-button>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="!gameState">Waiting for opponent...</div>
      <div v-else>
        <!-- {{ pickedHeroes }} -->
        <Picks
          :side="currentPlayerTurn ? 'radiant' : 'dire'"
          :picks="currentPlayerHeroes ?? []"
        />
        <Picks
          :side="currentPlayerTurn ? 'dire' : 'radiant'"
          :picks="otherPlayerHeroes ?? []"
        />
        <span
          style="
            width: 100%;
            display: block;
            height: 1px;
            background: #000;
            margin: 10px 0;
          "
        ></span>
        <Heroes :disabled="!currentPlayerTurn" @select="pick" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
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
import { useRouter } from "vue-router";
import Picks from "@/components/Picks.vue";
import Heroes from "@/components/Heroes.vue";

const router = useRouter();
const route = useRoute();
const gameId = ref<string>(route.params.gameId as string);
const { socket, playTurn, gameState } = useGame();

const currentPlayerTurn = computed(() => {
  return gameState.value?.currentTurn === socket.id;
});

function pick(hero: string) {
  if (!gameState.value || socket.id !== gameState.value.currentTurn) return;
  console.log("Picked hero:", hero);

  playTurn(gameId.value, {
    player: socket.id,
    hero,
  });
}

socket.on("update-game", (game: any) => {
  console.log("Received game update:", game);
  gameState.value = game;
});

function usePickedHeroes() {
  // pickedHeroes is object by user id and value as hero (property) pickedHeroes: Record<string, string[]> | undefined

  // get all picked heroes

  const pickedHeroes = computed(() => {
    if (!gameState.value?.pickedHeroes) return;
    return Object.values(gameState.value.pickedHeroes).flat();
  });

  const currentPlayerHeroes = computed(() => {
    if (!gameState.value?.pickedHeroes || !socket.id) return;
    return gameState.value.pickedHeroes[socket.id];
  });

  const otherPlayerHeroes = computed(() => {
    if (!gameState.value?.pickedHeroes || !socket.id) return;

    // Find the opponent's ID (the player who is not the current user)
    const opponentId = Object.keys(gameState.value.pickedHeroes).find(
      (playerId) => playerId !== socket.id
    );

    return opponentId ? gameState.value.pickedHeroes[opponentId] : null;
  });

  return { pickedHeroes, currentPlayerHeroes, otherPlayerHeroes };
}
// TODO : disable picked heroes ffrom the pool
const { pickedHeroes, currentPlayerHeroes, otherPlayerHeroes } =
  usePickedHeroes();
</script>
