import React from "react"
import { EnemyType } from "@/types"

interface EnemyCharacterProps {
  type: EnemyType
}

export const EnemyCharacter: React.FC<EnemyCharacterProps> = ({ type }) => {
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
    none: {
      size: "w-0 h-0",
      color: "bg-transparent",
      accent: "bg-transparent",
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
