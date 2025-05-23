import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { event_type, user_id, metadata } = await req.json();

    // Get IP and user agent
    const ip_address = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip');
    const user_agent = req.headers.get('user-agent');

    const { data, error } = await supabase
      .from('auth_tracking')
      .insert([
        {
          user_id,
          event_type,
          metadata,
          ip_address,
          user_agent,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ data }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    );
  }
});