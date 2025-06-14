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

export function useCurrentStore(name:any){
  const [store, setCurrentStore] = useState([])
  const getStore = async()=>{
    const {data,error} = await supabaseClient.from('stores').select().eq('storeName', name).single();
    if(data){
      setCurrentStore(data)
    }else{
      setCurrentStore(error)
    }
  }
  useEffect(()=>{
    getStore()
  },[name])
  return store;
}

