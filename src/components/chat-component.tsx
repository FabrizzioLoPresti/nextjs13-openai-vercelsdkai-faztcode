'use client'

import { useChat } from 'ai/react'

// type Props = {}

const ChatComponent = () => {
  const { handleInputChange, handleSubmit, messages, isLoading, input } =
    useChat()
  return (
    <form className="max-w-xl w-full" onSubmit={handleSubmit}>
      <div className="text-white max-h-96 h-full overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col mb-2 p-2 rounded-md ${
              m.role === 'user'
                ? 'self-start bg-blue-700'
                : 'self-end bg-gray-800'
            }`}
          >
            <span
              className={`text-xs ${
                m.role === 'user' ? 'text-left' : 'text-right'
              }`}
            >
              {m.role}
            </span>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex justify-between my-4">
        <label htmlFor="prompt" className="text-white block font-bold my-2">
          Say Something...
        </label>
        {/* Pending */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-md focus:outline-none disabled:opacity-50"
          disabled={isLoading || input.length === 0}
        >
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
      <textarea
        name="prompt"
        id="prompt"
        rows={4}
        value={input}
        placeholder="Type your message here..."
        className="text-black bg-slate-300 px-3 py-2 w-full rounded-md focus:outline-none"
        onChange={handleInputChange}
      />
    </form>
  )
}

export default ChatComponent
