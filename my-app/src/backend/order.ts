import supabaseClient from "./client";

export default async function addOrder(userID:any, totalPrice:any, checkoutSessionID: any){
    const {data, error} = await supabaseClient.from('orders').insert({userID: userID, totalPrice:totalPrice, checkoutSessionID: checkoutSessionID, isCompleted: false})
    if(error){
        console.error(error)
        return [];
    }else{
        return ['Success'];
        
    }
}