import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface AuthTrackingPayload {
  user_id: string;
  event_type: 'signup' | 'login';
  metadata?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    // Get the request body
    const payload: AuthTrackingPayload = await req.json();

    // Validate required fields
    if (!payload.user_id || !payload.event_type) {
      throw new Error("Missing required fields");
    }

    // Validate event_type
    if (!['signup', 'login'].includes(payload.event_type)) {
      throw new Error("Invalid event type");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        }
      }
    );

    // Insert the auth tracking record
    const { error } = await supabaseClient
      .from('auth_tracking')
      .insert({
        user_id: payload.user_id,
        event_type: payload.event_type,
        metadata: payload.metadata || {},
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip"),
        user_agent: req.headers.get("user-agent"),
      });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Auth event tracked successfully" }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while tracking auth event",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});