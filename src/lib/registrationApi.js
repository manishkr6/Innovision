const ENDPOINT = import.meta.env.VITE_REGISTRATION_URL;
const TIMEOUT_MS = 45000;

export class RegistrationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// text/plain keeps this a "simple" request: Apps Script can't answer a CORS preflight.
export const submitRegistration = async (payload) => {
  if (!ENDPOINT) {
    throw new RegistrationError('Online registration is not open yet. Please check back soon.', 'not_configured');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let result;
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    result = await response.json();
  } catch (err) {
    // The row may have saved before the connection dropped; retrying safely returns the same token.
    throw new RegistrationError('We could not confirm your registration. Check your connection and try again.', 'network');
  } finally {
    clearTimeout(timer);
  }

  if (!result?.ok) {
    throw new RegistrationError(result?.message || 'Your registration could not be saved. Please try again.', result?.code);
  }
  return result;
};
