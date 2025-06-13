import { useState, useEffect } from 'react';
import supabaseClient from '../client';

export function useLogin() {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    })
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false);
    })

    return () => subscription.unsubscribe()
  }, [])


  return { session, loading }
}

export function useUserTable(uid: string) {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    if (uid === "null") {
      setCurrentUser(null)
      return;
    }
    const getInfo = async () => {
      const { data, error } = await supabaseClient.from('users').select().eq('user_id', uid).single();
      if (data) {
        setCurrentUser(data)
      } else {
        setCurrentUser(error)
      }
    }
    getInfo();
  }, [uid])
  return currentUser
}

