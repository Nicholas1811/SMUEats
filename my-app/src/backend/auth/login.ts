import supabaseClient from '../client';

export async function signin(email: any, password: any) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });
    return { data, error }
}

export async function logout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.log("Logout failed")
        return error
    } else {
        console.log("Logout success")
        return true;
    }
}

export async function authSignup(password: any, email: any) {
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    })
    if (error) {
        return error
    }
    else {
        return data.user?.id;
    }
}

export async function signup(smuid: any, username: any, password: any, email: any) {
    const resSignup = await authSignup(password, email);
    if (typeof resSignup == 'object') {
        return { data: null, error: "Unable to sign up due to duplicate in account" };
    } else {
        const { data, error } = await supabaseClient.from('users').insert({ user_id: resSignup, username: username, smuid:smuid , pwd_length: password.length}).select()
        return { data, error }
    }
}


