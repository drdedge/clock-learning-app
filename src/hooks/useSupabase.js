import { useState, useEffect } from 'react';
import { supabase, supabaseHelpers } from '../utils/supabase';

// Hook for tracking student progress
export const useStudentProgress = (studentId) => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId || !supabase) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getProgress(studentId);
        setProgress(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching progress:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [studentId]);

  const saveProgress = async (category, skill, score) => {
    if (!studentId || !supabase) return;

    try {
      await supabaseHelpers.saveProgress(studentId, category, skill, score);
      // Refresh progress after saving
      const data = await supabaseHelpers.getProgress(studentId);
      setProgress(data);
    } catch (err) {
      console.error('Error saving progress:', err);
      setError(err.message);
    }
  };

  return { progress, loading, error, saveProgress };
};

// Hook for managing visual configurations
export const useVisualConfigs = (componentType) => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!componentType || !supabase) {
      setLoading(false);
      return;
    }

    const fetchConfigs = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getVisualConfigs(componentType);
        setConfigs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching configs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, [componentType]);

  const saveConfig = async (configName, settings) => {
    if (!componentType || !supabase) return;

    try {
      await supabaseHelpers.saveVisualConfig(componentType, configName, settings);
      // Refresh configs after saving
      const data = await supabaseHelpers.getVisualConfigs(componentType);
      setConfigs(data);
    } catch (err) {
      console.error('Error saving config:', err);
      setError(err.message);
    }
  };

  return { configs, loading, error, saveConfig };
};

// Hook for question templates
export const useQuestionTemplates = (category = null, difficulty = null) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await supabaseHelpers.getQuestionTemplates(category, difficulty);
        setTemplates(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [category, difficulty]);

  const saveTemplate = async (cat, type, diff, parameters, visualConfig = null) => {
    if (!supabase) return;

    try {
      await supabaseHelpers.saveQuestionTemplate(cat, type, diff, parameters, visualConfig);
      // Refresh templates after saving
      const data = await supabaseHelpers.getQuestionTemplates(category, difficulty);
      setTemplates(data);
    } catch (err) {
      console.error('Error saving template:', err);
      setError(err.message);
    }
  };

  return { templates, loading, error, saveTemplate };
};

// Hook for real-time subscriptions
export const useRealtimeProgress = (studentId) => {
  const [progress, setProgress] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!studentId || !supabase) return;

    // Initial fetch
    const fetchInitial = async () => {
      const data = await supabaseHelpers.getProgress(studentId);
      setProgress(data);
    };
    fetchInitial();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`student_progress_${studentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_progress',
          filter: `student_id=eq.${studentId}`
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setProgress(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setProgress(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setProgress(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe((status) => {
        setIsSubscribed(status === 'SUBSCRIBED');
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [studentId]);

  return { progress, isSubscribed };
};

// Hook for session management
export const useStudentSession = () => {
  const [studentId, setStudentId] = useState(() => {
    // Try to get student ID from localStorage
    return localStorage.getItem('studentId') || null;
  });

  const createSession = (id) => {
    setStudentId(id);
    localStorage.setItem('studentId', id);
  };

  const clearSession = () => {
    setStudentId(null);
    localStorage.removeItem('studentId');
  };

  return { studentId, createSession, clearSession };
};

// Hook for leaderboard data
export const useLeaderboard = (category = null, timeframe = 'week') => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // Calculate date range
        const now = new Date();
        let startDate;
        
        switch (timeframe) {
          case 'day':
            startDate = new Date(now.setDate(now.getDate() - 1));
            break;
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          default:
            startDate = new Date(now.setDate(now.getDate() - 7));
        }

        let query = supabase
          .from('student_progress')
          .select('student_id, score')
          .gte('timestamp', startDate.toISOString());

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Aggregate scores by student
        const scoresByStudent = {};
        data.forEach(record => {
          if (!scoresByStudent[record.student_id]) {
            scoresByStudent[record.student_id] = {
              student_id: record.student_id,
              totalScore: 0,
              count: 0
            };
          }
          scoresByStudent[record.student_id].totalScore += record.score;
          scoresByStudent[record.student_id].count += 1;
        });

        // Calculate averages and sort
        const leaderboardData = Object.values(scoresByStudent)
          .map(student => ({
            ...student,
            averageScore: Math.round(student.totalScore / student.count)
          }))
          .sort((a, b) => b.averageScore - a.averageScore)
          .slice(0, 10); // Top 10

        setLeaderboard(leaderboardData);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [category, timeframe]);

  return { leaderboard, loading, error };
};

export default {
  useStudentProgress,
  useVisualConfigs,
  useQuestionTemplates,
  useRealtimeProgress,
  useStudentSession,
  useLeaderboard
};