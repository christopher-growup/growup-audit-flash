const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
const TIMEOUT_MS = 8000;

export async function submitLead(payload: Record<string, unknown>): Promise<{ ok: boolean }> {
  if (!WEBHOOK_URL) {
    console.log("n8n webhook not configured. Payload:", payload);
    return { ok: true };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("submitLead error:", err);
    return { ok: false };
  } finally {
    clearTimeout(timeoutId);
  }
}
