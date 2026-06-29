const PRODUCTION_WEBHOOK_URL = 'https://rasai.app.n8n.cloud/webhook/clinic-booking';
const WEBHOOK_URL = process.env.BOOKING_WEBHOOK_URL || PRODUCTION_WEBHOOK_URL;

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return Response.json({ success: false }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
}
