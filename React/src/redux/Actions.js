import { login ,register} from "./api"

//advertiser
export const register1 = (advertiser) => {
    return { type: 'REGISTER', payload: advertiser }
}
export const setCurrentUser = (user) => {
    return { type: 'SET_CURRENT_USER', payload: user }
}
export const middleWareLogin = store => next => async action => {
    let realAction = await action
    if (realAction.type === 'LOGIN') {
        let a = {}
        try {
            a = await login(realAction.payload.email, realAction.payload.password)
            if (a.a == true) {
                realAction.payload = a.m
                return next(realAction);
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    else if (realAction.type === 'REGISTER') {
        let a = {}
        try {
            debugger
            a = await register(realAction.payload)
            if (a.a == true) {
                realAction.payload = a.m
                realAction.type="LOGIN"
                return next(realAction);
            }
            else {
                return {a:false,m:a.m};
            }
        }
        catch (error) {
            console.log(error);
            return {a:false,m:error};
        }
    }
    return false;

}
export const login1 = async (email, password) => {

    return { type: 'LOGIN', payload: { email, password } }
}
