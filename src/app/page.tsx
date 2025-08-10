"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header, GameComplete } from "@/components/layout"
import { Battlefield, Feedback, CodeInput, ReferenceCard } from "@/components/game"
import { useFlexboxGame } from "@/hooks/useFlexboxGame"

export default function FlexboxTrainer() {
  const {
    gameState,
    currentLevel,
    setUserCode,
    setShowAnswer,
    executeStrategy,
    resetGame,
    advanceLevel,
    resetLevel,
  } = useFlexboxGame()

  // Congrats modal on game complete
  if (gameState.gameComplete) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-indigo-600">Congratulations!</h2>
            <p className="text-gray-700">You've mastered all Flexbox challenges!</p>
            <p className="text-xl font-medium text-green-600">{gameState.score} Points</p>
            <button
              onClick={resetGame}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded"
            >
              Play Again
            </button>
          </div>
        </div>
        <GameComplete score={gameState.score} onReset={resetGame} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header score={gameState.score} />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Training Area */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-900">{currentLevel.title}</CardTitle>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-0">
                    {currentLevel.id} / {18}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">{currentLevel.description}</p>
              </CardHeader>
              <CardContent>
                <Battlefield level={currentLevel} battlefieldStyles={gameState.battlefieldStyles} />
                <Feedback 
                  showFeedback={gameState.showFeedback}
                  isCorrect={gameState.isCorrect}
                  hint={currentLevel.hint}
                />
              </CardContent>
            </Card>
          </div>

          {/* Code Input Area */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">Code the solution to help Batman save the Gotham</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{currentLevel.objective}</p>
              </CardHeader>
              <CardContent>
                <CodeInput
                  userCode={gameState.userCode}
                  setUserCode={setUserCode}
                  onExecute={executeStrategy}
                  showAnswer={gameState.showAnswer}
                  setShowAnswer={setShowAnswer}
                  level={currentLevel}
                />
              </CardContent>
            </Card>

            <ReferenceCard />
          </div>
        </div>
      </div>
      {/* Level Complete Modal */}
      {gameState.showFeedback && gameState.isCorrect && !gameState.gameComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-green-600">Level Complete!</h2>
            <p className="text-gray-700">You mastered "{currentLevel.title}"!</p>
            <p className="text-xl font-medium text-green-800">{gameState.score} Points</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={resetLevel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded"
              >
                Play Again
              </button>
              <button
                onClick={advanceLevel}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded"
              >
                Next Level
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="bg-gray-50 border-t border-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Design and code by{" "}
              <a 
                href="https://www.linkedin.com/in/ahmad-hassan3110/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                Ahmad Hassan
              </a>
              {" "}for Web Ascend Bootcamp 2025
            </p>
            <p className="text-xs text-gray-500 mt-1">&copy; 2025 Aestroid. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
