const API_BASE = "https://nest-todo-hptckf292-rafay0237s-projects.vercel.app"

export async function getTodos() {
  const response = await fetch(`${API_BASE}/todos`)
  if (!response.ok) {
    throw new Error("Failed to fetch todos")
  }
  return response.json()
}

export async function createTodo(title: string) {
  const response = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  })
  if (!response.ok) {
    throw new Error("Failed to create todo")
  }
  return response.json()
}

export async function toggleTodo(id: string) {
  const response = await fetch(`${API_BASE}/todos/${id}/toggle`, {
    method: "PATCH",
  })
  if (!response.ok) {
    throw new Error("Failed to toggle todo")
  }
  return response.json()
}

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete todo")
  }
}
