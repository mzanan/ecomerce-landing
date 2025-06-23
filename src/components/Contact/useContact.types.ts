export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactApiResponse {
  success: boolean
  messageId?: string
  error?: string
} 