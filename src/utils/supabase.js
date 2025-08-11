import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Some features may not work.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper functions for common operations
export const supabaseHelpers = {
  // Save student progress
  async saveProgress(studentId, category, skill, score) {
    if (!supabase) return null;
    
    try {
      const { data, error } = await supabase
        .from('student_progress')
        .insert([
          {
            student_id: studentId,
            category,
            skill,
            score,
            timestamp: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving progress:', error);
      return null;
    }
  },

  // Get student progress
  async getProgress(studentId, category = null) {
    if (!supabase) return [];
    
    try {
      let query = supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', studentId)
        .order('timestamp', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  },

  // Save visual configuration
  async saveVisualConfig(componentType, configName, settings) {
    if (!supabase) return null;
    
    try {
      const { data, error } = await supabase
        .from('visual_configs')
        .upsert([
          {
            component_type: componentType,
            config_name: configName,
            settings
          }
        ]);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving visual config:', error);
      return null;
    }
  },

  // Get visual configurations
  async getVisualConfigs(componentType) {
    if (!supabase) return [];
    
    try {
      const { data, error } = await supabase
        .from('visual_configs')
        .select('*')
        .eq('component_type', componentType);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching visual configs:', error);
      return [];
    }
  },

  // Save question template
  async saveQuestionTemplate(category, type, difficulty, parameters, visualConfig = null) {
    if (!supabase) return null;
    
    try {
      const { data, error } = await supabase
        .from('question_templates')
        .insert([
          {
            category,
            type,
            difficulty,
            parameters,
            visual_config: visualConfig
          }
        ]);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving question template:', error);
      return null;
    }
  },

  // Get question templates
  async getQuestionTemplates(category = null, difficulty = null) {
    if (!supabase) return [];
    
    try {
      let query = supabase
        .from('question_templates')
        .select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      if (difficulty) {
        query = query.eq('difficulty', difficulty);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching question templates:', error);
      return [];
    }
  }
};

export default supabase;