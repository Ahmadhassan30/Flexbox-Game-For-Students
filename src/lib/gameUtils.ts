import { CSSProperties } from "react"
import { Level } from "@/types"

export const parseUserCode = (code: string, level: Level): CSSProperties => {
  const styles: CSSProperties = {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(styles as any)[camelCaseProperty] = value
    }
  })

  return styles
}

export const checkAnswer = (userCode: string, level: Level): boolean => {
  const userStyles = parseUserCode(userCode, level)
  
  return level.expectedCode.every((expectedLine) => {
    const [property, value] = expectedLine.split(":").map((part) => part.trim())
    const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (userStyles as any)[camelCaseProperty] === value
  })
}
