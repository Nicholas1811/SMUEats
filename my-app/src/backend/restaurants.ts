import { useEffect, useState } from 'react';
import supabaseClient from './client';

export function useStore() {
  const [stores, setStore] = useState([])
  const getStores = async () => {
    const { data, error } = await supabaseClient.from('stores').select("*");
    if (data) {
      setStore(data)
    }else{
      setStore(error)
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
      setCurrentStore([error])
    }
  }
  
  useEffect(()=>{
    getStore()
  },[name])
  return store;
}

//use effect is important here because it looks for any changes re-rendering
//getting always returns a ARRAY with data. use state data can get overwritten
export function useCurrentFood(id: any){
  const [food, setcurrentfood] = useState([])
  const getFood = async() =>{
    const {data,error} = await supabaseClient.from('food').select().eq('storeID', id)
    if (data){
      setcurrentfood(data)
    }else{
      setcurrentfood([error])
    }
  }
  useEffect(()=>{
    getFood();
  },[id])
  return food;
}

