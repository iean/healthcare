'use client'
import { useEffect, useState } from 'react'

export default function MessagesPage() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then(setMessages)
  }, [])

  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        {messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg.id} className="border p-4 rounded">
                <h3 className="font-semibold">{msg.subject}</h3>
                <p className="text-sm mb-1">
                  From: {msg.name} ({msg.email})
                </p>
                <p className="mb-1">{msg.message}</p>
                <p className="text-xs text-gray-600">{new Date(msg.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
