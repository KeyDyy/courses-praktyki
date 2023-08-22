// user.tsx
'use client'
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { checkUserExistence, createUser } from "@/utils/createUser"; // Adjust the import path

interface User {
  id: string | null;
  email: string | null;
  name: string | null;
  picture: string | null;
}

interface UserContext {
  user: User | null;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
}

const Context = createContext<UserContext | null>(null);

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const router = useRouter();

  const supabaseClient = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  const getCurrentUser = async () => {
    try {
      const res = await supabaseClient.auth.getUser();
      if (res?.data.user) {
        const theUser = res.data.user;
        const id = theUser.id;
        const email = theUser.email;
        //console.log('Logged-in user_id:', id);

        if (id && email) {
          const [firstName, lastName] = extractNamesFromEmail(email);

          const identities = theUser.identities || [];
          setUser({
            id,
            email: theUser.email || null,
            name: identities[0]?.identity_data?.first_name || null,
            picture: identities[0]?.identity_data?.picture || null,
          });

          // Check if user with the given user_id exists in the database using utility function
          const userExists = await checkUserExistence(id);

          if (!userExists) {
            // User doesn't exist, create it using utility function
            const createUserSuccess = await createUser(id, firstName, lastName);
            if (!createUserSuccess) {
              console.error('Error creating user');
            }
          }
        }
      }
    } catch (error) {
      clearUser();
    }
  };

  useEffect(() => {
    const isUser = async () => {
      const currentSession = await supabaseClient.auth.getSession();
      if (currentSession) {
        await getCurrentUser();
      }
    };
    isUser();
  }, []);

  const signOut = async () => {
    try {
      await supabaseClient.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
    clearUser();
    router.push('/');
  };

  const clearUser = () => {
    setUser(null);
  };

  const contextValue: UserContext = {
    user,
    signOut,
    logout: signOut,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useUser = (): UserContext => {
  const userContext = useContext(Context);
  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return userContext;
};

export default Provider;

const extractNamesFromEmail = (email: string): [string, string | null] => {
  const parts = email.split('@')[0].split('.');
  const firstName = parts[0] || email;
  const lastName = parts[1] || null;
  return [firstName, lastName];
};
