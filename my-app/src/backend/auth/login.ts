import supabaseClient from '../client';

export async function signin(email: any, password: any) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });
    console.log(data, error)
    if (error) {
        return []
    }
    if (data) {
        return data
    }


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
        const { data, error } = await supabaseClient.from('users').insert({ user_id: resSignup, username: username, smuid: smuid, pwd_length: password.length }).select()
        return { data, error }
    }
}


export async function updateUsername(userID: any, usrname: any) {
    const { data } = await supabaseClient
        .from('users')
        .update({ username: usrname })
        .eq('user_id', userID)
    if (data == null) {
        console.log(data)
        return true
    }else{
        console.error(data)
        return false
    }
}

export async function updateUserPwd(userID: any, pwd: any) {
    const { data, error } = await supabaseClient.auth.updateUser({
        password: pwd
    })

    if(data){
        return true
    }
    if (error){
        console.error(error)
        return false
    }
}