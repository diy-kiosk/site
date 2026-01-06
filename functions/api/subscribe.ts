interface Env {
  KV_BINDING: KVNamespace;
}

interface SubscribeRequest {
  email: string;
  website?: string; // honeypot field - should be empty
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const body: SubscribeRequest = await request.json();
    const { email, website } = body;

    // Honeypot check - if filled, it's a bot
    if (website) {
      // Pretend success but don't save
      return new Response(
        JSON.stringify({ success: true, message: "Đăng ký thành công!" }),
        { status: 200, headers }
      );
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Email không hợp lệ" }),
        { status: 400, headers }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const existing = await env.KV_BINDING.get(normalizedEmail);
    if (existing) {
      return new Response(
        JSON.stringify({ success: true, message: "Email đã được đăng ký trước đó!" }),
        { status: 200, headers }
      );
    }

    // Save to KV
    const data = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      ip: request.headers.get("CF-Connecting-IP") || "unknown",
      userAgent: request.headers.get("User-Agent") || "unknown",
    };

    await env.KV_BINDING.put(normalizedEmail, JSON.stringify(data));

    return new Response(
      JSON.stringify({ success: true, message: "Đăng ký thành công!" }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại" }),
      { status: 500, headers }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
