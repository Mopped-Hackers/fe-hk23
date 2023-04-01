import {security} from '../../config';


export function setAuthTokens({accessToken, refreshToken}) {
    localStorage.setItem(security.localStorage.security_jwt_ls_name, accessToken);
    localStorage.setItem(security.localStorage.security_jwt_refresh_ls_name, refreshToken);
}

export function removeAuthTokens() {
    localStorage.removeItem(security.localStorage.security_jwt_refresh_ls_name);
    localStorage.removeItem(security.localStorage.security_jwt_ls_name);
}

export function isAuthTokens() {
    return localStorage.getItem(security.localStorage.security_jwt_ls_name)
        && localStorage.getItem(security.localStorage.security_jwt_refresh_ls_name);
}

export function getAuthAccessToken() {
    return localStorage.getItem(security.localStorage.security_jwt_ls_name)
        ? localStorage.getItem(security.localStorage.security_jwt_ls_name) : null;
}

export function getAuthRefreshToken() {
    return localStorage.getItem(security.localStorage.security_jwt_refresh_ls_name)
        ? localStorage.getItem(security.localStorage.security_jwt_refresh_ls_name) : null;
}

export function getAuthUserData(){
    return JSON.parse(localStorage.getItem(security.localStorage.security_user_ls_name));
}

export function setAuthUserData(user_data){
    localStorage.setItem(security.localStorage.security_user_ls_name,JSON.stringify(user_data));
}
export function removeAuthUserData(){
    localStorage.removeItem(security.localStorage.security_user_ls_name);
}
