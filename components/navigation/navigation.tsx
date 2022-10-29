import { useAuthState } from '../../context/auth-provider';
import { AppNavigation } from './app-navigation';
import { ChatNavigation } from './chat-navigation';

export const Navigation = () => {
  const { user } = useAuthState();

  return (
    <>
      <AppNavigation user={user} />
      {user && <ChatNavigation user={user} />}
    </>
  );
};
