import { useState, useCallback } from 'react';
import { apiService } from '@/services/api';

type CreateProjectData = {
  name: string;
  description?: string;
};

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(
    apiCall: () => Promise<T>,
    options: {
      onSuccess?: (data: T) => void;
      onError?: (error: string) => void;
      showError?: boolean;
    } = {}
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiCall();
      options.onSuccess?.(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      if (options.showError !== false) {
        console.error('API Error:', errorMessage);
      }

      options.onError?.(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, clearError: () => setError(null) };
};