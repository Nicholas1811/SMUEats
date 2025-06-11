import { createClient } from '@supabase/supabase-js';
import { env } from 'node:process';
import { useState } from 'react';

const url = process.env.REACT_APP_SUPABASE_URL as string;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const supabaseClient = createClient(url, key)
export default supabaseClient;


