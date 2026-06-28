const env = require("../config/env");

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const hasBrevoConfig = () =>
  Boolean(env.BREVO_API_KEY && env.BREVO_SENDER_EMAIL && env.BREVO_SENDER_NAME);

const sendBrevoEmail = async ({ to, subject, html, text }) => {
  if (!hasBrevoConfig()) {
    throw new Error("Brevo email configuration is missing");
  }

  const payload = {
    sender: {
      email: env.BREVO_SENDER_EMAIL,
      name: env.BREVO_SENDER_NAME,
    },
    to: Array.isArray(to) ? to : [to],
    subject,
    htmlContent: html,
    textContent: text,
  };

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": env.BREVO_API_KEY,
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  let responseBody = null;

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }
  }

  if (!response.ok) {
    const error = new Error(
      responseBody?.message || responseBody || "Brevo email request failed",
    );
    error.statusCode = response.status;
    error.code = responseBody?.code || "BREVO_EMAIL_FAILED";
    error.body = responseBody;
    throw error;
  }

  return {
    skipped: false,
    statusCode: response.status,
    body: responseBody,
  };
};

module.exports = { sendBrevoEmail, hasBrevoConfig };
