import React from "react"
import { RotateCcw, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GameCompleteProps {
  score: number
  onReset: () => void
}

export const GameComplete: React.FC<GameCompleteProps> = ({ score, onReset }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center border-0 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div
              className="w-full h-full bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold"
              style={{
                filter:
                  "hue-rotate(45deg) saturate(120%) brightness(110%) drop-shadow(0 4px 12px rgba(79,70,229,0.4))",
              }}
            >
              VR
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-gray-900">Flexbox Master</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            Congratulations! You have mastered all Flexbox concepts and become a true CSS warrior.
          </p>
          <div className="text-3xl font-light text-indigo-600">{score} points</div>
          <Button onClick={onReset} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            Train Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
