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

    const { operation, assessmentIds, questionId, data, options } = await req.json();

    let result;

    switch (operation) {
      case 'getByAssessments':
        result = await supabase
          .from('mcq_questions')
          .select('*')
          .in('assessment_id', assessmentIds)
          .order('order_index', { ascending: true });
        break;

      case 'getQuestionBank':
        result = await supabase
          .from('mcq_question_bank')
          .select('*')
          .order('created_at', { ascending: false });
        break;

      case 'getOptionsByQuestion':
        result = await supabase
          .from('mcq_options')
          .select('*')
          .eq('mcq_question_id', questionId)
          .order('order_index', { ascending: true });
        break;

      case 'getOptionsBankByQuestion':
        result = await supabase
          .from('mcq_options_bank')
          .select('*')
          .eq('mcq_question_bank_id', questionId)
          .order('order_index', { ascending: true });
        break;

      case 'createQuestion':
        result = await supabase
          .from('mcq_questions')
          .insert(data)
          .select()
          .single();
        break;

      case 'createOptions':
        result = await supabase
          .from('mcq_options')
          .insert(options)
          .select();
        break;

      case 'updateQuestion':
        result = await supabase
          .from('mcq_questions')
          .update(data)
          .eq('id', questionId)
          .select()
          .single();
        break;

      case 'deleteQuestion':
        result = await supabase
          .from('mcq_questions')
          .delete()
          .eq('id', questionId);
        break;

      case 'deleteOptions':
        result = await supabase
          .from('mcq_options')
          .delete()
          .eq('mcq_question_id', questionId);
        break;

      case 'deleteSpecificOptions':
        result = await supabase
          .from('mcq_options')
          .delete()
          .in('id', options);
        break;

      case 'updateOption':
        result = await supabase
          .from('mcq_options')
          .update(data)
          .eq('id', data.id)
          .select()
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
