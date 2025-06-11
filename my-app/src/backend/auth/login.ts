import { useState } from 'react';
import supabaseClient from '../client';

export const handleSubmit= async(event)=>{
    event.preventDefault();
    const {data, error} = await supabaseClient.auth.signInWithPassword();
    
}



