"use client"

import { FormEvent, ReactNode, useRef, useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

const STARTER_MESSAGES: ChatMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content: "Hi, I can answer quick questions about Mamun's work, stack, availability, and contact details.",
  },
]

const STARTER_PROMPTS = ["What does Mamun build?", "Show his strongest projects", "How can I contact him?"]

function renderInlineMarkdown(text: string): ReactNode[] {
  const markdownPattern = /(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(markdownPattern)) {
    const value = match[0]
    const index = match.index || 0

    if (index > lastIndex) nodes.push(text.slice(lastIndex, index))

    if (value.startsWith("**")) {
      nodes.push(<strong key={index} className={`portfolio-chatbot-highlight tone-${nodes.length % 4}`}>{value.slice(2, -2)}</strong>)
    } else if (value.startsWith("`")) {
      nodes.push(<code key={index}>{value.slice(1, -1)}</code>)
    } else if (value.startsWith("*")) {
      nodes.push(<em key={index}>{value.slice(1, -1)}</em>)
    } else {
      const linkMatch = value.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/)
      if (linkMatch) {
        nodes.push(
          <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>,
        )
      }
    }

    lastIndex = index + value.length
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function renderMarkdownBlock(block: string, index: number) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)
  const isBulletList = lines.every((line) => /^[-*]\s+/.test(line))
  const isNumberedList = lines.every((line) => /^\d+[.)]\s+/.test(line))

  if (isBulletList) {
    return (
      <ul key={index}>
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>{renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>
        ))}
      </ul>
    )
  }

  if (isNumberedList) {
    return (
      <ol key={index}>
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>{renderInlineMarkdown(line.replace(/^\d+[.)]\s+/, ""))}</li>
        ))}
      </ol>
    )
  }

  return <p key={index}>{renderInlineMarkdown(lines.join(" "))}</p>
}

function MarkdownMessage({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)

  return <div className="portfolio-chatbot-markdown">{blocks.map(renderMarkdownBlock)}</div>
}

export function PortfolioChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(STARTER_MESSAGES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function sendMessage(messageText: string) {
    const cleanMessage = messageText.trim()
    if (!cleanMessage || loading) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: cleanMessage,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput("")
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = (await response.json()) as { reply?: string; error?: string }

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "The chatbot could not respond right now.")
      }

      const assistantReply = data.reply
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: crypto.randomUUID(), role: "assistant", content: assistantReply },
      ])
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "The chatbot could not respond right now.")
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(input)
  }

  function openChat() {
    setOpen(true)
    window.setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <div className="portfolio-chatbot" data-open={open}>
      {open && (
        <section className="portfolio-chatbot-panel" aria-label="Portfolio chatbot">
          {/* Header keeps the assistant identity and close action visible. */}
          <div className="portfolio-chatbot-header">
            <div>
              <p>Ask about Mamun</p>
              <span>Portfolio assistant</span>
            </div>
            <button type="button" aria-label="Close chatbot" onClick={() => setOpen(false)}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Assistant messages render Markdown; user messages stay plain. */}
          <div className="portfolio-chatbot-messages" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={"portfolio-chatbot-message is-" + message.role}>
                {message.role === "assistant" ? <MarkdownMessage content={message.content} /> : message.content}
              </div>
            ))}
            {loading && <div className="portfolio-chatbot-message is-assistant">Thinking...</div>}
            {error && <p className="portfolio-chatbot-error">{error}</p>}
          </div>

          {/* Starter prompts help visitors ask useful portfolio questions fast. */}
          <div className="portfolio-chatbot-prompts" aria-label="Suggested questions">
            {STARTER_PROMPTS.map((prompt) => (
              <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} disabled={loading}>
                {prompt}
              </button>
            ))}
          </div>

          {/* Input submits questions to the server route, never directly to OpenRouter. */}
          <form className="portfolio-chatbot-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about experience, stack, projects..."
              aria-label="Ask a question about Mamun"
              disabled={loading}
            />
            <button type="submit" aria-label="Send message" disabled={loading || !input.trim()}>
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      {/* Floating launcher keeps the chat available without blocking content. */}
      <button type="button" className="portfolio-chatbot-toggle" aria-label="Open portfolio chatbot" onClick={openChat}>
        <MessageCircle size={21} aria-hidden="true" />
        <span>Ask</span>
      </button>
    </div>
  )
}
