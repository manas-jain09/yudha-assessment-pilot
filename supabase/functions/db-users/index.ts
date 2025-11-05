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

    const { operation, organizationId, userIds, userId, data, filters } = await req.json();

    let result;

    switch (operation) {
      case 'getByOrganization':
        result = await supabase
          .from('auth')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('role', 'student')
          .order('created_at', { ascending: false });
        break;

      case 'getByIds':
        result = await supabase
          .from('auth')
          .select('*')
          .in('id', userIds);
        break;

      case 'create':
        result = await supabase
          .from('auth')
          .insert(data)
          .select()
          .single();
        break;

      case 'update':
        result = await supabase
          .from('auth')
          .update(data)
          .eq('id', userId)
          .select()
          .single();
        break;

      case 'bulkUpdate':
        result = await supabase
          .from('auth')
          .update(data)
          .in('id', userIds)
          .select();
        break;

      case 'delete':
        result = await supabase
          .from('auth')
          .delete()
          .eq('id', userId);
        break;

      case 'bulkDelete':
        result = await supabase
          .from('auth')
          .delete()
          .in('id', userIds);
        break;

      case 'authenticate':
        result = await supabase
          .from('auth')
          .select('*')
          .eq('email', data.email)
          .eq('role', 'admin')
          .single();
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
