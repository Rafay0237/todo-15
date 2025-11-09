"use client"

import type { TodoItem } from "@/types/todo"
import { CheckCircle2, Circle, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const COLORS = [
  { bg: "bg-yellow-300", border: "border-yellow-400", shadow: "shadow-yellow-200" },
  { bg: "bg-pink-300", border: "border-pink-400", shadow: "shadow-pink-200" },
  { bg: "bg-blue-300", border: "border-blue-400", shadow: "shadow-blue-200" },
  { bg: "bg-green-300", border: "border-green-400", shadow: "shadow-green-200" },
  { bg: "bg-purple-300", border: "border-purple-400", shadow: "shadow-purple-200" },
  { bg: "bg-orange-300", border: "border-orange-400", shadow: "shadow-orange-200" },
]

interface TodoCardProps {
  todo: TodoItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  colorIndex: number
}

export default function TodoCard({ todo, onToggle, onDelete, colorIndex }: TodoCardProps) {
  const color = COLORS[colorIndex % COLORS.length]
  const createdDate = new Date(todo.createdAt)
  const updatedDate = new Date(todo.updatedAt)

  // Random rotation for sticky note effect
  const rotation = ((colorIndex * 7) % 6) - 3 // -3 to 3 degrees

  return (
    <div
      className={`
        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
        ${color.bg} ${color.border} border-2 rounded-2xl p-6 
        shadow-lg ${color.shadow} cursor-pointer
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`
      }}
    >
      {/* Header with checkbox */}
      <div className="flex items-start gap-3 mb-4">
        <button
          onClick={() => onToggle(todo._id)}
          className="flex-shrink-0 mt-1 text-gray-700 hover:text-gray-900 transition-all transform hover:scale-110 active:scale-95"
        >
          {todo.completed ? (
            <CheckCircle2 size={28} className="text-green-600" />
          ) : (
            <Circle size={28} className="text-gray-600" />
          )}
        </button>

        {/* Title */}
        <div className="flex-1">
          <h3
            className={`text-xl font-bold leading-tight ${
              todo.completed ? "text-gray-600 line-through" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>
        </div>
      </div>

      {/* Timestamps */}
      <div className="space-y-1 mb-4 text-sm text-gray-700 bg-white bg-opacity-40 rounded-lg p-3">
        <div className="flex justify-between">
          <span className="font-semibold">Created:</span>
          <span>{formatRelativeTime(createdDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Updated:</span>
          <span>{formatRelativeTime(updatedDate)}</span>
        </div>
      </div>

      {/* Status badge and delete button */}
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            todo.completed ? "bg-green-500 bg-opacity-30 text-green-700" : "bg-orange-500 bg-opacity-30 text-orange-700"
          }`}
        >
          {todo.completed ? "✓ Done" : "⏳ Pending"}
        </span>

        <button
          onClick={() => onDelete(todo._id)}
          className="text-gray-700 hover:text-red-600 transition-all transform hover:scale-110 active:scale-95"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

function formatRelativeTime(date: Date): string {
  try {
    return formatDistanceToNow(date, { addSuffix: false })
  } catch {
    return "Recently"
  }
}
