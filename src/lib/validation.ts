export function validateContactFormData(data: unknown): {
  name: string;
  email: string;
  subject: string;
  message: string;
} {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid request data');
  }

  const { name, email, subject, message } = data as Record<string, unknown>;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Name is required');
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    throw new Error('Valid email is required');
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    throw new Error('Subject is required');
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new Error('Message is required');
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 