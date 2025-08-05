import { useEffect, useState } from 'react';
import supabaseClient from './client';

export function useStore() {
  const [stores, setStore] = useState([])
  const getStores = async () => {
    const { data, error } = await supabaseClient.from('stores').select("*");
    if (data) {
      setStore(data)
    } else {
      setStore([])
    }
  }
  useEffect(() => {
    getStores()
  }, [])

  return stores;
}

export function useCurrentStore(name: any) {
  const [store, setCurrentStore] = useState([])
  const getStore = async () => {
    const { data, error } = await supabaseClient.from('stores').select().eq('storeName', name).single();
    if (data) {
      setCurrentStore(data)
    } else {
      setCurrentStore([])
    }
  }

  useEffect(() => {
    getStore()
  }, [name])
  return store;
}

//use effect is important here because it looks for any changes re-rendering
//getting always returns a ARRAY with data. use state data can get overwritten
export function useCurrentFood(id: any) {
  const [food, setcurrentfood] = useState([])
  const getFood = async () => {
    const { data, error } = await supabaseClient.from('food').select().eq('storeID', id).order('image', { ascending: false })
    if (data) {
      setcurrentfood(data)
    } else {
      setcurrentfood([])
    }
  }
  useEffect(() => {
    getFood();
  }, [id])
  return food;
}

export async function useSingleFood(id: any, foodName: any) {
  const { data, error } = await supabaseClient
    .from('food')
    .select(`storeID, foodName, price, image, food_addons (
      *,
      add_ons(*)
    )`)
    .eq('storeID', id)
    .eq('foodName', foodName)
  if (data) {
    return data
  }
  else {
    return []
  }
}

export async function getAddon(id: any, foodName: any) {
  const { data, error } = await supabaseClient
    .from('food')
    .select(`storeID, foodName, food_addons (
      *,
      add_ons(*)
    )`)
    .eq('storeID', id)
    .eq('foodName', foodName)
  if (data) {
    return data
  }
  else {
    return []
  }
}

export async function getFoodImage(id: any, foodName:any){
  const {data, error} = await supabaseClient.from('food').select('image')
  .eq('storeID', id)
  .eq('foodName', foodName)

  if(data){
    return data
  }else{
    return []
  }
}