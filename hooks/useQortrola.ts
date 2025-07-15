import { useState, useCallback } from 'react';
import { QortrolaAPI } from '@/lib/qortrola-api';

export function useQortrola() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const api = QortrolaAPI.getInstance();

  const executeRequest = useCallback(async <T>(
    requestFn: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    api,
    loading,
    error,
    executeRequest,
  };
}
