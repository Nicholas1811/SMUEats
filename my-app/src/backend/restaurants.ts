import { useEffect, useState } from 'react';
import supabaseClient from './client';

export function useStore() {
  const [stores, setStore] = useState([])
  const getStores = async () => {
    const { data, error } = await supabaseClient.from('stores').select("*");
    if (data) {
      setStore(data)
    } 
  }
  useEffect(() => {
    getStores()
  }, [])

  return stores;
}

