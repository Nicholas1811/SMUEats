import supabaseClient from './client';

async function payItem(price: any,email: any){
    let newPrice = price * 100;
    const { data , error } = await supabaseClient.functions.invoke('checkout-session',{
        body: JSON.stringify({amount:newPrice, email: email})
    })
    if(error){
        console.error(error)
        return [];
    }
    if(data){
        //window.location = data.url
        console.log(data,'data field')
        return [data.url,data.id]
    }
}
export default payItem;
