import { NextResponse } from "next/server"
import { capabilities, coreStack, credentials, headlineMetric, site, traces } from "@/config/site"
import { getAllCaseStudies } from "@/lib/case-studies"

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
const DEFAULT_MODEL = "nvidia/nemotron-3.5-lightning:free"
const MAX_MESSAGES = 8
const MAX_MESSAGE_LENGTH = 900

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type OpenRouterChatResponse = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
  error?: {
    message?: string
  }
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false

  const message = value as Record<string, unknown>
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  )
}

function getPortfolioContext() {
  const caseStudies = getAllCaseStudies().map((caseStudy) => ({
    title: caseStudy.title,
    role: caseStudy.meta.role,
    stack: caseStudy.meta.stack,
    teaser: caseStudy.teaser,
    metric: caseStudy.metric,
    outcome: caseStudy.outcome,
  }))

  return JSON.stringify({
    person: {
      name: site.name,
      title: site.title,
      location: site.location,
      timezone: site.timezone,
      availability: site.availability,
      email: site.email,
      phone: site.phone,
      positioning: site.positioning,
      yearsExperience: site.yearsExperience,
      timezoneOverlap: site.timezoneOverlap,
      socials: site.socials,
    },
    coreStack,
    capabilities,
    credentials,
    headlineMetric,
    traces,
    caseStudies,
  })
}

function buildSystemPrompt() {
  return [
    "You are the portfolio assistant for Md. AL Mamun Mim.",
    "Answer as a helpful assistant on his website.",
    "Use only the portfolio facts in this context. Do not invent projects, employers, dates, metrics, or skills.",
    "Keep answers short, clear, and useful for recruiters, clients, and engineering leads.",
    "Use simple Markdown when it improves readability: short paragraphs, bullet lists, bold labels, inline code, and links only.",
    "Use bold Markdown for important names, roles, technologies, metrics, and contact details so the interface can highlight them.",
    "Do not wrap the answer in a Markdown code block.",
    "Return only the final answer. Do not show chain of thought, hidden reasoning, analysis, or a thinking process.",
    `If someone asks about availability, hiring, contact, or rates, suggest emailing ${site.email}.`,
    "If the answer is not in the context, say you do not know from the portfolio and suggest contacting him.",
    "",
    "Portfolio context:",
    getPortfolioContext(),
  ].join("\n")
}

function getCleanMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return []

  return messages
    .filter(isChatMessage)
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL

  if (!apiKey) {
    return NextResponse.json({ error: "OpenRouter API key is not configured." }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const messages = getCleanMessages(body && typeof body === "object" ? (body as { messages?: unknown }).messages : undefined)

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Send at least one user message." }, { status: 400 })
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": site.url,
      "X-Title": site.name,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 700,
      include_reasoning: false,
      reasoning: { effort: "none", exclude: true },
    }),
  })

  const data = (await response.json().catch(() => null)) as OpenRouterChatResponse | null

  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "The chatbot could not respond right now." },
      { status: response.status },
    )
  }

  const reply = data?.choices?.[0]?.message?.content?.trim()

  if (!reply) {
    return NextResponse.json({ error: "The chatbot returned an empty response." }, { status: 502 })
  }

  return NextResponse.json({ reply, model })
}
