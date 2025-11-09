"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

interface TodoFormProps {
  onAdd: (title: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setIsLoading(true)
      await onAdd(input.trim())
      setInput("")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all text-lg"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-8 py-4 bg-gradient-to-r from-pink-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 text-white font-bold rounded-2xl flex items-center gap-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        <Plus size={24} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  )
}
