import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ReferenceCard: React.FC = () => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-gray-900">Flexbox Command Reference</CardTitle>
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
  )
}
