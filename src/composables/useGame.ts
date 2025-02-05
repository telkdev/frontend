import { io } from "socket.io-client";
import { ref } from "vue";

interface Move {
  player: string;
  hero: string;
}

interface GameState {
  players: string[];
  turns: Move[];
  currentTurn: string;
  pickedHeroes: Record<string, string[]>;
}

const socket = io("http://localhost:3000"); // Update with backend URL
const gameState = ref<GameState | null>(null);

export function useGame() {
  const createGame = (gameId: string) => {
    socket.emit("create-game", gameId);
  };

  const joinGame = (gameId: string) => {
    socket.emit("join-game", gameId);
  };

  const playTurn = (gameId: string, move: Move) => {
    socket.emit("play-turn", { gameId, move });
  };

  return {
    createGame,
    joinGame,
    playTurn,
    gameState,
    socket,
  };
}
