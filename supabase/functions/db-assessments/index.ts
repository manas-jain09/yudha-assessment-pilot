import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { operation, assessmentCodes, assessmentId, data } = await req.json();

    let result;

    switch (operation) {
      case 'getByCodes':
        result = await supabase
          .from('assessments')
          .select('*')
          .in('code', assessmentCodes)
          .order('created_at', { ascending: false });
        break;

      case 'getAll':
        result = await supabase
          .from('assessments')
          .select('*')
          .order('created_at', { ascending: false });
        break;

      case 'create':
        result = await supabase
          .from('assessments')
          .insert(data)
          .select()
          .single();
        break;

      case 'update':
        result = await supabase
          .from('assessments')
          .update(data)
          .eq('id', assessmentId)
          .select()
          .single();
        break;

      case 'delete':
        result = await supabase
          .from('assessments')
          .delete()
          .eq('id', assessmentId);
        break;

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    if (result.error) throw result.error;

    return new Response(JSON.stringify(result.data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
