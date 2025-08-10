import { CSSProperties } from "react"

export interface Level {
  id: number
  title: string
  description: string
  objective: string
  expectedCode: string[]
  hint: string
  heroType: "warrior" | "mage" | "archer" | "knight" | "batman"
  heroCount: number
  enemyType: "goblin" | "orc" | "dragon" | "skeleton" | "none"
  enemyCount: number
  battlefieldStyle: CSSProperties
}

export type HeroType = "warrior" | "mage" | "archer" | "knight" | "batman"
export type EnemyType = "goblin" | "orc" | "dragon" | "skeleton" | "none"

export interface GameState {
  currentLevel: number
  userCode: string
  isCorrect: boolean
  showFeedback: boolean
  score: number
  gameComplete: boolean
  battlefieldStyles: CSSProperties
  showAnswer: boolean
}
