"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, CheckCircle, XCircle } from "lucide-react"

interface Level {
  id: number
  title: string
  description: string
  objective: string
  expectedCode: string[]
  hint: string
  heroType: "warrior" | "mage" | "archer" | "knight"
  heroCount: number
  enemyType: "goblin" | "orc" | "dragon" | "skeleton"
  enemyCount: number
  battlefieldStyle: React.CSSProperties
}

const levels: Level[] = [
  {
    id: 1,
    title: "The First Stand",
    description: "Our VR hero faces a goblin. Position the hero in the center of the battlefield.",
    objective: "Center the hero both horizontally and vertically",
    expectedCode: ["justify-content: center", "align-items: center"],
    hint: "Use justify-content and align-items properties",
    heroType: "warrior",
    heroCount: 1,
    enemyType: "goblin",
    enemyCount: 1,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 2,
    title: "Advance to Victory",
    description: "The hero must advance to the far edge to corner the goblin.",
    objective: "Position the hero at the end of the main axis",
    expectedCode: ["justify-content: flex-end"],
    hint: "Think about the end of the main axis",
    heroType: "warrior",
    heroCount: 1,
    enemyType: "goblin",
    enemyCount: 1,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 3,
    title: "Strategic Retreat",
    description: "Fall back to the starting position to regroup.",
    objective: "Position the hero at the beginning of the main axis",
    expectedCode: ["justify-content: flex-start"],
    hint: "Return to the starting position",
    heroType: "warrior",
    heroCount: 1,
    enemyType: "orc",
    enemyCount: 1,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 4,
    title: "Tower Defense",
    description: "The VR hero must defend from the tower. Change formation to vertical.",
    objective: "Stack elements vertically and center horizontally",
    expectedCode: ["flex-direction: column", "align-items: center"],
    hint: "Change the direction first, then align",
    heroType: "mage",
    heroCount: 1,
    enemyType: "skeleton",
    enemyCount: 1,
    battlefieldStyle: {},
  },
  {
    id: 5,
    title: "Vertical Advance",
    description: "Push forward in column formation to the top of the battlefield.",
    objective: "Move to the end of the vertical axis",
    expectedCode: ["flex-direction: column", "justify-content: flex-end"],
    hint: "In column direction, justify-content controls vertical position",
    heroType: "mage",
    heroCount: 1,
    enemyType: "skeleton",
    enemyCount: 1,
    battlefieldStyle: {},
  },
  {
    id: 6,
    title: "Three Heroes United",
    description: "Three VR heroes must spread across the battlefield with equal spacing.",
    objective: "Distribute heroes with equal space between them",
    expectedCode: ["justify-content: space-between"],
    hint: "Equal space between items, not around them",
    heroType: "warrior",
    heroCount: 3,
    enemyType: "goblin",
    enemyCount: 3,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 7,
    title: "Balanced Formation",
    description: "Create a balanced formation with equal space around each hero.",
    objective: "Distribute heroes with equal space around each",
    expectedCode: ["justify-content: space-around"],
    hint: "Equal space around each item",
    heroType: "warrior",
    heroCount: 3,
    enemyType: "orc",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 8,
    title: "Perfect Distribution",
    description: "Achieve perfect spacing with equal distribution across the entire battlefield.",
    objective: "Distribute heroes with perfectly even spacing",
    expectedCode: ["justify-content: space-evenly"],
    hint: "Even space everywhere, including the edges",
    heroType: "archer",
    heroCount: 3,
    enemyType: "skeleton",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 9,
    title: "Flanking Maneuver",
    description: "Reverse the formation to surprise the enemy from behind.",
    objective: "Reverse the row direction while maintaining center alignment",
    expectedCode: ["flex-direction: row-reverse", "align-items: center"],
    hint: "Reverse the main axis direction",
    heroType: "archer",
    heroCount: 2,
    enemyType: "orc",
    enemyCount: 2,
    battlefieldStyle: {},
  },
  {
    id: 10,
    title: "Descending Strike",
    description: "Attack from above by reversing the column formation.",
    objective: "Reverse the column direction and center horizontally",
    expectedCode: ["flex-direction: column-reverse", "align-items: center"],
    hint: "Reverse the column direction",
    heroType: "mage",
    heroCount: 2,
    enemyType: "dragon",
    enemyCount: 1,
    battlefieldStyle: {},
  },
  {
    id: 11,
    title: "Flexible Army",
    description: "The battlefield is too small! Allow heroes to wrap to new lines.",
    objective: "Enable wrapping and center the wrapped content",
    expectedCode: ["flex-wrap: wrap", "justify-content: center"],
    hint: "Allow items to wrap when space runs out",
    heroType: "knight",
    heroCount: 4,
    enemyType: "skeleton",
    enemyCount: 3,
    battlefieldStyle: { flexDirection: "row", width: "200px" },
  },
  {
    id: 12,
    title: "Wrapped Formation",
    description: "Control how wrapped lines are distributed vertically.",
    objective: "Wrap items and distribute wrapped lines with space between",
    expectedCode: ["flex-wrap: wrap", "align-content: space-between"],
    hint: "align-content controls wrapped line distribution",
    heroType: "warrior",
    heroCount: 4,
    enemyType: "orc",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row", width: "200px", height: "200px" },
  },
  {
    id: 13,
    title: "Growing Strength",
    description: "The lead hero must grow stronger and take more space.",
    objective: "Make the first hero grow to fill available space",
    expectedCode: ["justify-content: flex-start"],
    hint: "Use flex-grow on individual items (add flex-grow: 1 to first child)",
    heroType: "knight",
    heroCount: 3,
    enemyType: "dragon",
    enemyCount: 1,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 14,
    title: "Individual Positioning",
    description: "The VR hero needs special positioning different from the group.",
    objective: "Align the group to flex-start but center the second hero individually",
    expectedCode: ["align-items: flex-start"],
    hint: "Use align-self on individual items (add align-self: center to second child)",
    heroType: "mage",
    heroCount: 3,
    enemyType: "skeleton",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row", height: "200px" },
  },
  {
    id: 15,
    title: "Reorder the Ranks",
    description: "The hero must move to the front without changing the HTML structure.",
    objective: "Move the last hero to the front using CSS order",
    expectedCode: ["justify-content: flex-start"],
    hint: "Use order property on individual items (add order: -1 to last child)",
    heroType: "archer",
    heroCount: 3,
    enemyType: "orc",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 16,
    title: "Spaced Ranks",
    description: "Create gaps between heroes for better formation.",
    objective: "Add consistent spacing between all heroes",
    expectedCode: ["gap: 20px", "justify-content: center"],
    hint: "Use gap property to add space between items",
    heroType: "knight",
    heroCount: 3,
    enemyType: "dragon",
    enemyCount: 1,
    battlefieldStyle: { flexDirection: "row" },
  },
  {
    id: 17,
    title: "Stretch Formation",
    description: "All heroes must stretch to fill the battlefield height.",
    objective: "Stretch all heroes to the full height of the container",
    expectedCode: ["align-items: stretch"],
    hint: "Stretch items to fill the cross axis",
    heroType: "warrior",
    heroCount: 3,
    enemyType: "skeleton",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row", height: "150px" },
  },
  {
    id: 18,
    title: "Ultimate VR Battle",
    description: "Master the ultimate formation: wrapped, spaced, and centered.",
    objective: "Wrap items, center them, and distribute wrapped lines evenly",
    expectedCode: ["flex-wrap: wrap", "justify-content: center", "align-content: space-around"],
    hint: "Combine wrapping, main axis, and cross axis alignment",
    heroType: "knight",
    heroCount: 5,
    enemyType: "dragon",
    enemyCount: 2,
    battlefieldStyle: { flexDirection: "row", width: "250px", height: "200px" },
  },
]

export default function FlexboxTrainer() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [battlefieldStyles, setBattlefieldStyles] = useState<React.CSSProperties>({})
  const [showAnswer, setShowAnswer] = useState(false)

  const level = levels[currentLevel]

  useEffect(() => {
    if (level) {
      setBattlefieldStyles({
        display: "flex",
        ...level.battlefieldStyle,
      })
      setShowAnswer(false)
    }
  }, [level])

  const parseUserCode = (code: string): React.CSSProperties => {
    const styles: React.CSSProperties = {
      display: "flex",
      ...level.battlefieldStyle,
    }

    const lines = code
      .split(";")
      .map((line) => line.trim())
      .filter((line) => line)

    lines.forEach((line) => {
      const [property, value] = line.split(":").map((part) => part.trim())
      if (property && value) {
        const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        ;(styles as any)[camelCaseProperty] = value
      }
    })

    return styles
  }

  const checkAnswer = () => {
    const userStyles = parseUserCode(userCode)
    const isLevelCorrect = level.expectedCode.every((expectedLine) => {
      const [property, value] = expectedLine.split(":").map((part) => part.trim())
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      return (userStyles as any)[camelCaseProperty] === value
    })

    setIsCorrect(isLevelCorrect)
    setShowFeedback(true)

    if (isLevelCorrect) {
      setBattlefieldStyles(userStyles)
      setScore(score + 100)

      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1)
          setUserCode("")
          setShowFeedback(false)
          setShowAnswer(false)
        } else {
          setGameComplete(true)
        }
      }, 1500)
    }
  }

  const resetGame = () => {
    setCurrentLevel(0)
    setUserCode("")
    setIsCorrect(false)
    setShowFeedback(false)
    setScore(0)
    setGameComplete(false)
    setShowAnswer(false)
  }

  const HeroCharacter = ({ type, index }: { type: "warrior" | "mage" | "archer" | "knight"; index?: number }) => {
    // Different filters/effects for different character types
    const getCharacterStyle = (type: string) => {
      switch (type) {
        case "warrior":
          return "hue-rotate-0 saturate-110"
        case "mage":
          return "hue-rotate-180 saturate-120"
        case "archer":
          return "hue-rotate-90 saturate-100"
        case "knight":
          return "hue-rotate-270 saturate-90"
        default:
          return ""
      }
    }

    return (
      <div className="relative flex flex-col items-center">
        {/* Hero Character Image */}
        <div className="relative">
          <img
            src="/images/hero-character.jpg"
            alt="VR Hero"
            className={`w-16 h-20 object-cover rounded-lg shadow-lg transition-all duration-300 hover:scale-105 ${getCharacterStyle(type)}`}
            style={{
              filter: `${getCharacterStyle(type)} drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
            }}
          />

          {/* Character Type Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm">
            {type === "warrior" && <div className="w-full h-full bg-blue-500 rounded-full"></div>}
            {type === "mage" && <div className="w-full h-full bg-purple-500 rounded-full"></div>}
            {type === "archer" && <div className="w-full h-full bg-green-500 rounded-full"></div>}
            {type === "knight" && <div className="w-full h-full bg-gray-500 rounded-full"></div>}
          </div>
        </div>

        {/* Shadow */}
        <div className="w-12 h-3 bg-black opacity-20 rounded-full mt-1"></div>
      </div>
    )
  }

  const EnemyCharacter = ({ type }: { type: "goblin" | "orc" | "dragon" | "skeleton" }) => {
    const enemyStyles = {
      goblin: {
        size: "w-8 h-10",
        color: "bg-red-600",
        accent: "bg-red-800",
      },
      orc: {
        size: "w-10 h-12",
        color: "bg-orange-600",
        accent: "bg-orange-800",
      },
      dragon: {
        size: "w-14 h-16",
        color: "bg-purple-800",
        accent: "bg-purple-900",
      },
      skeleton: {
        size: "w-8 h-12",
        color: "bg-gray-300",
        accent: "bg-gray-500",
      },
    }

    const style = enemyStyles[type]

    return (
      <div className="relative flex flex-col items-center">
        {/* Enemy Body */}
        <div className={`${style.size} ${style.color} rounded-lg relative shadow-lg`}>
          {/* Eyes */}
          <div className="absolute top-2 left-1 w-1 h-1 bg-red-400 rounded-full"></div>
          <div className="absolute top-2 right-1 w-1 h-1 bg-red-400 rounded-full"></div>

          {/* Arms */}
          <div className={`absolute -left-1 top-3 w-2 h-4 ${style.accent} rounded`}></div>
          <div className={`absolute -right-1 top-3 w-2 h-4 ${style.accent} rounded`}></div>

          {type === "dragon" && (
            <>
              {/* Wings */}
              <div className={`absolute -left-2 top-1 w-3 h-6 ${style.accent} rounded-full`}></div>
              <div className={`absolute -right-2 top-1 w-3 h-6 ${style.accent} rounded-full`}></div>
            </>
          )}
        </div>

        {/* Shadow */}
        <div className="w-6 h-2 bg-black opacity-20 rounded-full mt-1"></div>
      </div>
    )
  }

  const renderHeroes = () => {
    return Array.from({ length: level.heroCount }, (_, i) => <HeroCharacter key={i} type={level.heroType} index={i} />)
  }

  const renderEnemies = () => {
    return Array.from({ length: level.enemyCount }, (_, i) => <EnemyCharacter key={i} type={level.enemyType} />)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <img
                src="/images/hero-character.jpg"
                alt="VR Hero Champion"
                className="w-full h-full object-cover rounded-full shadow-lg"
                style={{
                  filter:
                    "hue-rotate(45deg) saturate(120%) brightness(110%) drop-shadow(0 4px 12px rgba(79,70,229,0.4))",
                }}
              />
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
            <Button onClick={resetGame} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 h-12">
              <RotateCcw className="w-4 h-4 mr-2" />
              Train Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-gray-900">Flexbox VR Academy</h1>
              <p className="text-sm text-gray-500 mt-1">Master CSS Flexbox through immersive VR battles</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-xl font-light text-indigo-600">{score}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Training Area */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-900">{level.title}</CardTitle>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-0">
                    {level.id} / {levels.length}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">{level.description}</p>
              </CardHeader>
              <CardContent>
                {/* Battlefield */}
                <div className="relative mb-6">
                  <div
                    className="battlefield min-h-48 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-indigo-300 rounded-lg p-6 transition-all duration-300"
                    style={battlefieldStyles}
                  >
                    {renderHeroes()}
                  </div>

                  {/* Enemies positioned around battlefield */}
                  <div className="absolute -top-4 -right-4 flex gap-2">{renderEnemies()}</div>
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <div
                    className={`p-4 rounded-lg border ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
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
                          {isCorrect ? "Advancing to next VR challenge..." : level.hint}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Code Input Area */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">VR Battle Strategy</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{level.objective}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">CSS Formation Code</label>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-400 mb-2">.battlefield {"{"}</div>
                    <div className="text-gray-400 ml-4 mb-1">display: flex;</div>
                    <Input
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="justify-content: center;"
                      className="bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 ml-4 font-mono"
                    />
                    <div className="text-gray-400 mt-2">{"}"}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={checkAnswer}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-0 h-12"
                    disabled={!userCode.trim()}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Execute VR Strategy
                  </Button>

                  <Button
                    onClick={() => setShowAnswer(!showAnswer)}
                    variant="outline"
                    className="px-4 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {showAnswer ? "Hide" : "Show"} Solution
                  </Button>
                </div>

                {/* Answer Section */}
                {showAnswer && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm font-medium text-amber-800">VR Battle Solution</span>
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
                    <p className="text-xs text-amber-700 mt-2">Study this formation carefully before implementing it</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reference */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-gray-900">VR Command Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">justify-content</div>
                    <div className="text-gray-600">
                      flex-start | center | flex-end | space-between | space-around | space-evenly
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">align-items</div>
                    <div className="text-gray-600">flex-start | center | flex-end | stretch | baseline</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">flex-direction</div>
                    <div className="text-gray-600">row | column | row-reverse | column-reverse</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">flex-wrap</div>
                    <div className="text-gray-600">nowrap | wrap | wrap-reverse</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">align-content</div>
                    <div className="text-gray-600">
                      flex-start | center | flex-end | space-between | space-around | stretch
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">gap</div>
                    <div className="text-gray-600">length value (e.g., 10px, 1rem)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
