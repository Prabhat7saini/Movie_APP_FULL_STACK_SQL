// hooks/useRegister.ts
import { useState } from 'react';
import { SignUPdata } from "../interface/types"; // Adjust the import path as needed

interface UseRegisterResponse {
  register: (newUser: SignUPdata) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useRegister = (): UseRegisterResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (newUser: SignUPdata) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    
  };

  return {
    register,
    loading,
    error,
    success,
  };
};
