const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export async function submitLead(payload: Record<string, unknown>): Promise<{ ok: boolean }> {
  if (!WEBHOOK_URL) {
    console.log("n8n webhook not configured. Payload:", payload);
    return { ok: true };
  }

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return { ok: res.ok };
}
