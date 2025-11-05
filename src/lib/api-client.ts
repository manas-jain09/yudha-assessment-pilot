import { supabase } from '@/integrations/supabase/client';

export const apiClient = {
  // Organizations
  organizations: {
    getById: async (organizationId: string) => {
      const { data, error } = await supabase.functions.invoke('db-organizations', {
        body: { operation: 'getById', organizationId }
      });
      if (error) throw error;
      return data;
    },
    update: async (organizationId: string, updateData: any) => {
      const { data, error } = await supabase.functions.invoke('db-organizations', {
        body: { operation: 'update', organizationId, data: updateData }
      });
      if (error) throw error;
      return data;
    }
  },

  // Assessments
  assessments: {
    getByCodes: async (assessmentCodes: string[]) => {
      const { data, error } = await supabase.functions.invoke('db-assessments', {
        body: { operation: 'getByCodes', assessmentCodes }
      });
      if (error) throw error;
      return data;
    },
    getAll: async () => {
      const { data, error } = await supabase.functions.invoke('db-assessments', {
        body: { operation: 'getAll' }
      });
      if (error) throw error;
      return data;
    },
    create: async (assessmentData: any) => {
      const { data, error } = await supabase.functions.invoke('db-assessments', {
        body: { operation: 'create', data: assessmentData }
      });
      if (error) throw error;
      return data;
    },
    update: async (assessmentId: string, updateData: any) => {
      const { data, error } = await supabase.functions.invoke('db-assessments', {
        body: { operation: 'update', assessmentId, data: updateData }
      });
      if (error) throw error;
      return data;
    },
    delete: async (assessmentId: string) => {
      const { data, error } = await supabase.functions.invoke('db-assessments', {
        body: { operation: 'delete', assessmentId }
      });
      if (error) throw error;
      return data;
    }
  },

  // Users
  users: {
    getByOrganization: async (organizationId: string) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'getByOrganization', organizationId }
      });
      if (error) throw error;
      return data;
    },
    getByIds: async (userIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'getByIds', userIds }
      });
      if (error) throw error;
      return data;
    },
    create: async (userData: any) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'create', data: userData }
      });
      if (error) throw error;
      return data;
    },
    update: async (userId: string, updateData: any) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'update', userId, data: updateData }
      });
      if (error) throw error;
      return data;
    },
    bulkUpdate: async (userIds: string[], updateData: any) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'bulkUpdate', userIds, data: updateData }
      });
      if (error) throw error;
      return data;
    },
    delete: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'delete', userId }
      });
      if (error) throw error;
      return data;
    },
    bulkDelete: async (userIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'bulkDelete', userIds }
      });
      if (error) throw error;
      return data;
    },
    authenticate: async (email: string, password: string) => {
      const { data, error } = await supabase.functions.invoke('db-users', {
        body: { operation: 'authenticate', data: { email, password } }
      });
      if (error) throw error;
      return data;
    }
  },

  // MCQ
  mcq: {
    getByAssessments: async (assessmentIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'getByAssessments', assessmentIds }
      });
      if (error) throw error;
      return data;
    },
    getQuestionBank: async () => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'getQuestionBank' }
      });
      if (error) throw error;
      return data;
    },
    getOptionsByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'getOptionsByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    getOptionsBankByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'getOptionsBankByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    createQuestion: async (questionData: any) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'createQuestion', data: questionData }
      });
      if (error) throw error;
      return data;
    },
    createOptions: async (optionsData: any[]) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'createOptions', options: optionsData }
      });
      if (error) throw error;
      return data;
    },
    updateQuestion: async (questionId: string, updateData: any) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'updateQuestion', questionId, data: updateData }
      });
      if (error) throw error;
      return data;
    },
    deleteQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'deleteQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    deleteOptions: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-mcq', {
        body: { operation: 'deleteOptions', questionId }
      });
      if (error) throw error;
      return data;
    }
  },

  // Coding
  coding: {
    getByAssessments: async (assessmentIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getByAssessments', assessmentIds }
      });
      if (error) throw error;
      return data;
    },
    getQuestionBank: async () => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getQuestionBank' }
      });
      if (error) throw error;
      return data;
    },
    getLanguagesByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getLanguagesByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    getLanguagesBankByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getLanguagesBankByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    getExamplesByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getExamplesByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    getExamplesBankByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getExamplesBankByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    getTestCasesByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getTestCasesByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    getTestCasesBankByQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'getTestCasesBankByQuestion', questionId }
      });
      if (error) throw error;
      return data;
    },
    createQuestion: async (questionData: any) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'createQuestion', data: questionData }
      });
      if (error) throw error;
      return data;
    },
    createLanguages: async (languagesData: any[]) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'createLanguages', languages: languagesData }
      });
      if (error) throw error;
      return data;
    },
    createExamples: async (examplesData: any[]) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'createExamples', examples: examplesData }
      });
      if (error) throw error;
      return data;
    },
    createTestCases: async (testCasesData: any[]) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'createTestCases', testCases: testCasesData }
      });
      if (error) throw error;
      return data;
    },
    updateQuestion: async (questionId: string, updateData: any) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'updateQuestion', questionId, data: updateData }
      });
      if (error) throw error;
      return data;
    },
    deleteQuestion: async (questionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-coding', {
        body: { operation: 'deleteQuestion', questionId }
      });
      if (error) throw error;
      return data;
    }
  },

  // Results
  results: {
    getByAssessmentAndUsers: async (assessmentId: string, userIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('db-results', {
        body: { operation: 'getByAssessmentAndUsers', assessmentId, userIds }
      });
      if (error) throw error;
      return data;
    },
    getSubmissionDetails: async (submissionId: string) => {
      const { data, error } = await supabase.functions.invoke('db-results', {
        body: { operation: 'getSubmissionDetails', submissionId }
      });
      if (error) throw error;
      return data;
    }
  },

  // Constraints
  constraints: {
    create: async (constraints: any[]) => {
      const { data, error } = await supabase.functions.invoke('db-constraints', {
        body: { operation: 'create', constraints }
      });
      if (error) throw error;
      return data;
    },
    deleteByAssessment: async (assessmentId: string) => {
      const { data, error } = await supabase.functions.invoke('db-constraints', {
        body: { operation: 'deleteByAssessment', assessmentId }
      });
      if (error) throw error;
      return data;
    }
  },

  // Learning Paths
  learningPaths: {
    getAll: async () => {
      const { data, error } = await supabase.functions.invoke('db-learning-paths', {
        body: { operation: 'getAll' }
      });
      if (error) throw error;
      return data;
    }
  }
};
