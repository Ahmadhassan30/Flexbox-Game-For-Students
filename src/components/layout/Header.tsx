import React from "react"

interface HeaderProps {
  score: number
}

export const Header: React.FC<HeaderProps> = ({ score }) => {
  return (
    <header className="border-b border-gray-100 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Batman Flexbox Challenge</h1>
            <p className="text-sm text-gray-600 mt-1">Master CSS Flexbox by helping Batman save Gotham</p>
          </div>
          <div className="text-right bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-lg">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Score</div>
            <div className="text-xl font-bold text-indigo-600">{score}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
