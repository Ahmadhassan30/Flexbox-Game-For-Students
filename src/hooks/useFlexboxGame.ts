import { useState, useEffect } from "react"
import { GameState } from "@/types"
import { levels } from "@/data/levels"
import { checkAnswer, parseUserCode } from "@/lib/gameUtils"

export const useFlexboxGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    userCode: "",
    isCorrect: false,
    showFeedback: false,
    score: 0,
    gameComplete: false,
    battlefieldStyles: {},
    showAnswer: false,
  })

  const currentLevel = levels[gameState.currentLevel]

  useEffect(() => {
    if (currentLevel) {
      setGameState(prev => ({
        ...prev,
        battlefieldStyles: {
          display: "flex",
          ...currentLevel.battlefieldStyle,
        },
        showAnswer: false,
      }))
    }
  }, [currentLevel])

  // Real-time battlefield update as user types
  useEffect(() => {
    if (gameState.userCode.trim() && currentLevel) {
      const userStyles = parseUserCode(gameState.userCode, currentLevel)
      setGameState(prev => ({
        ...prev,
        battlefieldStyles: userStyles,
      }))
    } else if (currentLevel) {
      // Reset to default when code is empty
      setGameState(prev => ({
        ...prev,
        battlefieldStyles: {
          display: "flex",
          ...currentLevel.battlefieldStyle,
        },
      }))
    }
  }, [gameState.userCode, currentLevel])

  const setUserCode = (code: string) => {
    setGameState(prev => ({ ...prev, userCode: code }))
  }

  const setShowAnswer = (show: boolean) => {
    setGameState(prev => ({ ...prev, showAnswer: show }))
  }

  const executeStrategy = () => {
    const isCorrect = checkAnswer(gameState.userCode, currentLevel)
    const userStyles = parseUserCode(gameState.userCode, currentLevel)
    setGameState(prev => ({
      ...prev,
      isCorrect,
      showFeedback: true,
      // If correct, apply styles and award points
      battlefieldStyles: isCorrect ? userStyles : prev.battlefieldStyles,
      score: isCorrect ? prev.score + 100 : prev.score,
    }))
  }

  const resetGame = () => {
    setGameState({
      currentLevel: 0,
      userCode: "",
      isCorrect: false,
      showFeedback: false,
      score: 0,
      gameComplete: false,
      battlefieldStyles: {},
      showAnswer: false,
    })
  }

  // Advance to next level or complete game
  const advanceLevel = () => {
    setGameState(prev => {
      const isLast = prev.currentLevel === levels.length - 1
      if (isLast) {
        return {
          ...prev,
          gameComplete: true,
          showFeedback: false,
        }
      }
      const nextLevel = prev.currentLevel + 1
      return {
        ...prev,
        currentLevel: nextLevel,
        userCode: "",
        isCorrect: false,
        showFeedback: false,
        showAnswer: false,
        battlefieldStyles: {
          display: "flex",
          ...levels[nextLevel].battlefieldStyle,
        },
      }
    })
  }

  // Reset current level
  const resetLevel = () => {
    setGameState(prev => ({
      ...prev,
      userCode: "",
      isCorrect: false,
      showFeedback: false,
      showAnswer: false,
      battlefieldStyles: {
        display: "flex",
        ...currentLevel.battlefieldStyle,
      },
    }))
  }

  return {
    gameState,
    currentLevel,
    setUserCode,
    setShowAnswer,
    executeStrategy,
    resetGame,
    advanceLevel,
    resetLevel,
  }
}
