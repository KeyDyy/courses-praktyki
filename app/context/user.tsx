
'use client'
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { checkUserExistence, createUser } from "@/utils/createUser";
import { Language, lessFortunate } from "@prisma/client";


interface User {
  id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  image: string | null;
  language: Language | null;
  lessFortunate: lessFortunate | null;
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

          const userFromSupabase = await checkUserExistence(id);

          if (userFromSupabase) {
            setUser({
              id,
              email: theUser.email || null,
              first_name: userFromSupabase.first_name || null,
              last_name: userFromSupabase.last_name || null,
              image: userFromSupabase.picture || null,
              language: userFromSupabase.language || null,
              lessFortunate: userFromSupabase.lessFortunate || null,

            });
          } else {
            console.error('User not found in database');
          }


          if (!userFromSupabase) {
            // User doesn't exist, create it using utility function
            const createUserSuccess = await createUser(id, firstName, lastName, email);
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
  const lastNamePart = parts.slice(1).join('.');
  const lastName = lastNamePart.replace(/[^a-zA-Z]/g, '');
  return [firstName, lastName || null];
};
