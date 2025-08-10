import React from "react"
import Image from "next/image"
import { HeroType } from "@/types"

interface HeroCharacterProps {
  type: HeroType
}

export const HeroCharacter: React.FC<HeroCharacterProps> = ({ type }) => {
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
      <div className="relative w-16 h-20 transition-all duration-300 hover:scale-105">
        <Image
          src="/images/hero-character.jpg"
          alt={`${type} hero`}
          fill
          className={`object-cover rounded-lg ${getCharacterStyle(type)}`}
          style={{ filter: `${getCharacterStyle(type)} drop-shadow(0 4px 8px rgba(0,0,0,0.3))` }}
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
