import React from "react"
import { CheckCircle, XCircle } from "lucide-react"

interface FeedbackProps {
  showFeedback: boolean
  isCorrect: boolean
  hint: string
}

export const Feedback: React.FC<FeedbackProps> = ({ showFeedback, isCorrect, hint }) => {
  if (!showFeedback) return null

  return (
    <div
      className={`p-4 rounded-lg border ${
        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-center gap-3">
        {isCorrect ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <div>
          <div className={`font-medium ${isCorrect ? "text-green-900" : "text-red-900"}`}>
            {isCorrect ? "Victory Achieved!" : "Strategy Failed"}
          </div>
          <div className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Advancing to next Flexbox challenge..." : hint}
          </div>
        </div>
      </div>
    </div>
  )
}
