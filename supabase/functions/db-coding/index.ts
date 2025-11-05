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

    const { operation, assessmentIds, questionId, data, languages, examples, testCases } = await req.json();

    let result;

    switch (operation) {
      case 'getByAssessments':
        result = await supabase
          .from('coding_questions')
          .select('*')
          .in('assessment_id', assessmentIds)
          .order('order_index', { ascending: true });
        break;

      case 'getQuestionBank':
        result = await supabase
          .from('coding_question_bank')
          .select('*')
          .order('created_at', { ascending: false });
        break;

      case 'getLanguagesByQuestion':
        result = await supabase
          .from('coding_languages')
          .select('*')
          .eq('coding_question_id', questionId);
        break;

      case 'getLanguagesBankByQuestion':
        result = await supabase
          .from('coding_languages_bank')
          .select('*')
          .eq('coding_question_bank_id', questionId);
        break;

      case 'getExamplesByQuestion':
        result = await supabase
          .from('coding_examples')
          .select('*')
          .eq('coding_question_id', questionId)
          .order('order_index', { ascending: true });
        break;

      case 'getExamplesBankByQuestion':
        result = await supabase
          .from('coding_examples_bank')
          .select('*')
          .eq('coding_question_bank_id', questionId)
          .order('order_index', { ascending: true });
        break;

      case 'getTestCasesByQuestion':
        result = await supabase
          .from('test_cases')
          .select('*')
          .eq('coding_question_id', questionId)
          .order('order_index', { ascending: true });
        break;

      case 'getTestCasesBankByQuestion':
        result = await supabase
          .from('test_cases_bank')
          .select('*')
          .eq('coding_question_bank_id', questionId)
          .order('order_index', { ascending: true });
        break;

      case 'createQuestion':
        result = await supabase
          .from('coding_questions')
          .insert(data)
          .select()
          .single();
        break;

      case 'createLanguages':
        result = await supabase
          .from('coding_languages')
          .insert(languages)
          .select();
        break;

      case 'createExamples':
        result = await supabase
          .from('coding_examples')
          .insert(examples)
          .select();
        break;

      case 'createTestCases':
        result = await supabase
          .from('test_cases')
          .insert(testCases)
          .select();
        break;

      case 'updateQuestion':
        result = await supabase
          .from('coding_questions')
          .update(data)
          .eq('id', questionId)
          .select()
          .single();
        break;

      case 'deleteQuestion':
        result = await supabase
          .from('coding_questions')
          .delete()
          .eq('id', questionId);
        break;

      case 'deleteLanguages':
        result = await supabase
          .from('coding_languages')
          .delete()
          .eq('coding_question_id', questionId);
        break;

      case 'deleteExamples':
        result = await supabase
          .from('coding_examples')
          .delete()
          .eq('coding_question_id', questionId);
        break;

      case 'deleteTestCases':
        result = await supabase
          .from('test_cases')
          .delete()
          .eq('coding_question_id', questionId);
        break;

      case 'deleteSpecificLanguages':
        result = await supabase
          .from('coding_languages')
          .delete()
          .in('id', languages);
        break;

      case 'deleteSpecificExamples':
        result = await supabase
          .from('coding_examples')
          .delete()
          .in('id', examples);
        break;

      case 'deleteSpecificTestCases':
        result = await supabase
          .from('test_cases')
          .delete()
          .in('id', testCases);
        break;

      case 'updateLanguage':
        result = await supabase
          .from('coding_languages')
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
        break;

      case 'updateExample':
        result = await supabase
          .from('coding_examples')
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
        break;

      case 'updateTestCase':
        result = await supabase
          .from('test_cases')
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
