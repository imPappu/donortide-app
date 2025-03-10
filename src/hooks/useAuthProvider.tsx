
import { useSession } from './auth/useSession';
import { useLogin } from './auth/useLogin';
import { useRegister } from './auth/useRegister';
import { useProfileManagement } from './auth/useProfileManagement';

export const useAuthProvider = () => {
  const { user, setUser, isLoading, logout, isAuthenticated } = useSession();
  const { login } = useLogin(setUser);
  const { register } = useRegister(setUser);
  const { updateProfile, verifyAccount } = useProfileManagement(user, setUser);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    verifyAccount
  };
};
