import { NextRequest, NextResponse } from 'next/server'
import mailjet from 'node-mailjet'

const mailjetClient = mailjet.apiConnect(
  process.env.NEXT_PUBLIC_MAILJET_API_KEY!,
  process.env.NEXT_PUBLIC_MAILJET_API_SECRET!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    const result = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.NEXT_PUBLIC_MAILJET_SENDER_EMAIL!,
            Name: 'Website Contact',
          },
          To: [
            {
              Email: process.env.NEXT_PUBLIC_MAILJET_RECEIVER_EMAIL!,
              Name: 'Site Owner',
            },
          ],
          Subject: subject,
          TextPart: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          HTMLPart: `<h3>${subject}</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        },
      ],
    })

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Mailjet error:', error)
    return NextResponse.json({ message: 'Email sending failed', error }, { status: 500 })
  }
}
