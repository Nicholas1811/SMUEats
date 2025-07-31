import supabaseClient from "./client";

export async function addOrder(userID: any, totalPrice: any, checkoutSessionID: any) {
    const { data, error } = await supabaseClient.from('orders')
        .insert({ userID: userID, totalPrice: totalPrice, checkoutSessionID: checkoutSessionID, isCompleted: false })
        .select(`orderID`)
    if (error) {
        console.error(error)
        return [];
    } else {
        return data[0].orderID;

    }
}

export async function addOrderItem(orderID: any, storeID: any, foodName: string, addons: {}, finPrice: number, totalQuantity: number) {
    const { data, error } = await supabaseClient.from('orderItem')
        .insert({ orderID: orderID, storeID: storeID, foodName: foodName, addons: addons, finPrice: finPrice, quantity: totalQuantity })

    if (error) {
        console.error(error)
        return []
    } else {
        console.log(data, 'line 23')
        return data
    }
}

export async function getUserOrder(curusrid: any) {
    const { data, error } = await supabaseClient.from('orders')
        .select('*')
        .eq('userID', curusrid)

    if (error) {
        return []
    } else {
        return data
    }
}

//getting is ok
export async function getUserOrderItems(orderID: any) {
    const { data, error } = await supabaseClient.from('orderItem')
        .select('*')
        .eq('orderID', orderID)

    if (error) {
        
        return []
    } else {
        return data
    }
}