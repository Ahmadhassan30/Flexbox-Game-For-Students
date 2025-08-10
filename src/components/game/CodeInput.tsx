import React from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Level } from "@/types"

interface CodeInputProps {
  userCode: string
  setUserCode: (code: string) => void
  onExecute: () => void
  showAnswer: boolean
  setShowAnswer: (show: boolean) => void
  level: Level
}

export const CodeInput: React.FC<CodeInputProps> = ({
  userCode,
  setUserCode,
  onExecute,
  showAnswer,
  setShowAnswer,
  level
}) => {
  // Parse and validate user input
  const parseUserCode = (code: string) => {
    const properties: Record<string, string> = {}
    const lines = code.split(';').map(line => line.trim()).filter(line => line)
    
    lines.forEach(line => {
      const [property, value] = line.split(':').map(part => part.trim())
      if (property && value) {
        properties[property] = value
      }
    })
    
    return properties
  }

  const parsedProperties = parseUserCode(userCode)
  
  // Check if properties are valid
  const getPropertyStatus = (property: string, value: string) => {
    const validProperties = {
      'justify-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      'align-items': ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
      'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
      'align-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'stretch'],
      'gap': true, // Accept any value for gap
    }

    if (property in validProperties) {
      const validValues = validProperties[property as keyof typeof validProperties]
      if (validValues === true) return 'valid'
      return (validValues as string[]).includes(value) ? 'valid' : 'invalid'
    }
    return 'unknown'
  }

  // Render syntax-highlighted code
  const renderHighlightedCode = () => {
    if (!userCode.trim()) {
      return (
        <Input
          value={userCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserCode(e.target.value)}
          placeholder="justify-content: center;"
          className="bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 ml-4 font-mono"
        />
      )
    }

    const lines = userCode.split(';').map(line => line.trim()).filter(line => line)
    
    return (
      <div className="ml-4">
        {lines.map((line, index) => {
          const [property, value] = line.split(':').map(part => part.trim())
          const status = property && value ? getPropertyStatus(property, value) : 'incomplete'
          
          return (
            <div key={index} className="relative group">
              <span 
                className={`${
                  status === 'valid' ? 'text-green-400' : 
                  status === 'invalid' ? 'text-red-400' : 
                  status === 'unknown' ? 'text-yellow-400' : 'text-gray-400'
                }`}
              >
                {property && value ? (
                  <>
                    <span className="text-blue-300">{property}</span>
                    <span className="text-gray-400">: </span>
                    <span className={
                      status === 'valid' ? 'text-green-400' : 
                      status === 'invalid' ? 'text-red-400' : 'text-yellow-400'
                    }>{value}</span>
                    <span className="text-gray-400">;</span>
                  </>
                ) : (
                  <span className="text-gray-500">{line}</span>
                )}
              </span>
              
              {/* Status indicator */}
              <span className={`ml-2 text-xs ${
                status === 'valid' ? 'text-green-400' : 
                status === 'invalid' ? 'text-red-400' : 
                status === 'unknown' ? 'text-yellow-400' : 'hidden'
              }`}>
                {status === 'valid' ? '✓' : status === 'invalid' ? '✗' : status === 'unknown' ? '?' : ''}
              </span>
            </div>
          )
        })}
        
        {/* Input for new line */}
        <Input
          value=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = userCode + (userCode.endsWith(';') ? ' ' : '; ') + e.target.value
            setUserCode(newValue)
          }}
          placeholder="Add another property..."
          className="bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 font-mono mt-1"
        />
      </div>
    )
  }

  // Property suggestions based on current level
  const renderPropertySuggestions = () => {
    const suggestions: string[] = []
    
    // Get expected properties for current level
    level.expectedCode.forEach(expectedLine => {
      const [property] = expectedLine.split(':').map(part => part.trim())
      if (property && !parsedProperties[property]) {
        suggestions.push(property)
      }
    })

    if (suggestions.length === 0) return null

    return (
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-xs text-gray-400">Suggestions:</span>
        {suggestions.map(property => (
          <button
            key={property}
            onClick={() => setUserCode(userCode + (userCode ? '; ' : '') + property + ': ')}
            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
          >
            {property}
          </button>
        ))}
      </div>
    )
  }

  // In-app sarcastic modal sequence before revealing solution
  const [popupMessages, setPopupMessages] = React.useState<string[]>([])
  const [popupIndex, setPopupIndex] = React.useState(0)
  const handleShowSolution = () => {
    if (!showAnswer) {
      setPopupMessages([
        "Really? You want to peek at the solution?",
        "No shame in learning... or is there?",
        "Fine, but don’t blame me if you miss the challenge!",
        "Okay, last chance to back out!",
      ])
      setPopupIndex(0)
    } else {
      setShowAnswer(false)
    }
  }

  return (
    <>
      {/* Sarcastic popup modal */}
      {popupMessages.length > 0 && popupIndex < popupMessages.length && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-gray-800 mb-4">{popupMessages[popupIndex]}</p>
            <div className="flex justify-between gap-2">
              {popupIndex > 0 ? (
                <button
                  onClick={() => setPopupIndex(popupIndex - 1)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={() => setPopupMessages([])}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  const next = popupIndex + 1
                  if (next < popupMessages.length) {
                    setPopupIndex(next)
                  } else {
                    setPopupMessages([])
                    setShowAnswer(true)
                  }
                }}
                className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
              >
                {popupIndex < popupMessages.length - 1 ? 'Next' : 'Show Solution'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">CSS Formation Code</label>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-400 mb-2">.battlefield {"{"}</div>
            <div className="text-gray-400 ml-4 mb-1">display: flex;</div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="justify-content: center; align-items: center;"
              rows={3}
              className="bg-transparent w-full border-none text-white placeholder-gray-500 focus:ring-0 ml-4 font-mono resize-none"
            />
            <div className="text-gray-400 mt-2">{"}"}</div>
          </div>
          {/* Suggestions unchanged */}
          {renderPropertySuggestions()}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onExecute}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-0 h-12"
            disabled={!userCode.trim()}
          >
            <Play className="w-4 h-4 mr-2" />
            Execute VR Strategy
          </Button>

          <Button
            onClick={handleShowSolution}
            variant="outline"
            className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 h-12"
          >
            {showAnswer ? "Hide Solution" : "Show Solution"}
          </Button>
        </div>

        {/* Answer Section */}
        {showAnswer && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-amber-800">Flexbox Problem Solution</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
              <div className="text-gray-400 mb-1">.battlefield {"{"}</div>
              <div className="text-gray-400 ml-4 mb-1">display: flex;</div>
              {level.expectedCode.map((line, index) => (
                <div key={index} className="text-green-400 ml-4">
                  {line};
                </div>
              ))}
              <div className="text-gray-400 mt-1">{"}"}</div>
            </div>
            <p className="text-xs text-amber-700 mt-2">Study this code snippet carefully before implementing it!</p>
          </div>
        )}
      </div>
    </>
  )
}
