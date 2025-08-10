import React from "react"
import { CSSProperties } from "react"
import { Level } from "@/types"
import { HeroCharacter } from "@/components/characters"

interface BattlefieldProps {
  level: Level
  battlefieldStyles: CSSProperties
}

export const Battlefield: React.FC<BattlefieldProps> = ({ level, battlefieldStyles }) => {
  const renderHeroes = () => {
    return Array.from({ length: level.heroCount }, (_, i) => (
      <HeroCharacter key={i} type={level.heroType} />
    ))
  }


  // Get visual indicators based on current flex properties
  const getFlexDirection = () => battlefieldStyles.flexDirection || 'row'
  const getJustifyContent = () => battlefieldStyles.justifyContent || 'flex-start'
  const getAlignItems = () => battlefieldStyles.alignItems || 'stretch'
  const getFlexWrap = () => battlefieldStyles.flexWrap || 'nowrap'
  const getGap = () => battlefieldStyles.gap || '0px'

  // Visual guide lines based on flex direction
  const renderGuideLines = () => {
    const direction = getFlexDirection()
    const isRow = direction === 'row' || direction === 'row-reverse'
    
    return (
      <>
        {/* Cross axis guide (was Main) */}
        <div
          className={`absolute ${
            isRow ? 'left-1/2 top-2 bottom-2 w-0.5' : 'top-1/2 left-2 right-2 h-0.5'
          } bg-purple-400 opacity-20 transition-all duration-300`}
          style={{ transform: isRow ? 'translateX(-50%)' : 'translateY(-50%)' }}
        />
        
        {/* Main axis guide (was Cross) */}
        <div
          className={`absolute ${
            isRow ? 'top-1/2 left-2 right-2 h-0.5' : 'left-1/2 top-2 bottom-2 w-0.5'
          } bg-indigo-400 opacity-30 transition-all duration-300`}
          style={{ transform: isRow ? 'translateY(-50%)' : 'translateX(-50%)' }}
        />
      </>
    )
  }

  // Property indicators
  const renderPropertyIndicators = () => {
    const direction = getFlexDirection()
    const justify = getJustifyContent()
    const align = getAlignItems()
    const wrap = getFlexWrap()
    const gap = getGap()

    return (
      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs rounded px-2 py-1 font-mono">
        <div className="flex flex-col gap-0.5">
          <span className="text-blue-300">flex-direction: {direction}</span>
          {justify !== 'flex-start' && (
            <span className="text-green-300">justify-content: {justify}</span>
          )}
          {align !== 'stretch' && (
            <span className="text-purple-300">align-items: {align}</span>
          )}
          {wrap !== 'nowrap' && (
            <span className="text-yellow-300">flex-wrap: {wrap}</span>
          )}
          {gap !== '0px' && (
            <span className="text-orange-300">gap: {gap}</span>
          )}
        </div>
      </div>
    )
  }

  // Axis labels
  const renderAxisLabels = () => {
    const direction = getFlexDirection()
    const isRow = direction === 'row' || direction === 'row-reverse'
    
    return (
      <>
        {/* Cross axis label (swapped) */}
        <div
          className={`absolute ${
            isRow 
              ? 'bottom-1 left-1/2 transform -translate-x-1/2' 
              : 'right-1 top-1/2 transform -translate-y-1/2 rotate-90'
          } text-xs text-purple-600 font-medium bg-white px-2 py-1 rounded shadow-sm`}
        >
          Cross Axis
        </div>
        
        {/* Main axis label (swapped) */}
        <div
          className={`absolute ${
            isRow 
              ? 'right-1 top-1/2 transform -translate-y-1/2 rotate-90' 
              : 'bottom-1 left-1/2 transform -translate-x-1/2'
          } text-xs text-indigo-600 font-medium bg-white px-2 py-1 rounded shadow-sm`}
        >
          Main Axis
        </div>
      </>
    )
  }

  // Visual feedback for justify-content
  const renderJustifyContentIndicator = () => {
    const justify = getJustifyContent()
    const direction = getFlexDirection()
    const isRow = direction === 'row' || direction === 'row-reverse'
    
    if (justify === 'flex-start') return null

    const getIndicatorPosition = () => {
      switch (justify) {
        case 'center':
          return isRow ? 'left-1/2 transform -translate-x-1/2' : 'top-1/2 transform -translate-y-1/2'
        case 'flex-end':
          return isRow ? 'right-2' : 'bottom-2'
        case 'space-between':
          return isRow ? 'left-2 right-2' : 'top-2 bottom-2'
        case 'space-around':
        case 'space-evenly':
          return isRow ? 'left-4 right-4' : 'top-4 bottom-4'
        default:
          return ''
      }
    }

    return (
      <div
        className={`absolute ${getIndicatorPosition()} ${
          isRow ? 'top-0 h-1' : 'left-0 w-1'
        } bg-green-400 opacity-60 transition-all duration-300`}
      />
    )
  }

  return (
    <div className="relative mb-6">
      <div
        className="battlefield min-h-48 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-indigo-300 rounded-lg p-6 transition-all duration-500 relative overflow-hidden"
        style={battlefieldStyles}
      >
        {/* Visual guides and indicators */}
        {renderGuideLines()}
        {renderJustifyContentIndicator()}
        
        {/* Heroes */}
        {renderHeroes()}
        
        {/* Axis labels */}
        {renderAxisLabels()}
      </div>

      {/* Property indicators overlay */}
      {renderPropertyIndicators()}

    </div>
  )
}
