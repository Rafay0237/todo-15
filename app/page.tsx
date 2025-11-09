"use client"

import { useState, useEffect } from "react"
import TodoForm from "@/components/todo-form"
import TodoCard from "@/components/todo-card"
import type { TodoItem } from "@/types/todo"
import { getTodos, createTodo, toggleTodo, deleteTodo } from "@/lib/api"

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await getTodos()
      setTodos(data)
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo(title)
      setTodos([newTodo, ...todos])
    } catch (error) {
      console.error("Failed to create todo:", error)
    }
  }

  const handleToggleTodo = async (id: string) => {
    try {
      const updatedTodo = await toggleTodo(id)
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)))
    } catch (error) {
      console.error("Failed to toggle todo:", error)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error("Failed to delete todo:", error)
    }
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 p-6 md:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">✨ My Tasks</h1>
          <p className="text-lg text-gray-600">
            {completedCount} of {todos.length} tasks completed
          </p>
        </div>

        {/* Add Todo Form */}
        <TodoForm onAdd={handleAddTodo} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-yellow-300 border-t-pink-400 animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your tasks...</p>
            </div>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No tasks yet!</h2>
            <p className="text-gray-500">Create your first task above to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {todos.map((todo, index) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                colorIndex={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
