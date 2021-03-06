import { BASE_URL, ACCESS_TOKEN } from "export/export";

export function request(options){
    const headers = new Headers({
        "Content-Type" : "application/json;charset=utf-8"
    });
    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append(
            "Authorization",
            "Bearer"+ localStorage.getItem(ACCESS_TOKEN)
        );
    }
    const defaults = {headers : headers};
    options = Object.assign({},defaults, options);

    return fetch(options.url , options).then( response => 
        response.json().then(json => {
            if(!response.ok){
                return Promise.reject(json);
            }
            return json
        })
    )
}

export function login(loginRequest){
    console.log(loginRequest);
    return request({
        url : BASE_URL + "/member/login",
        method : "POST",
        body : JSON.stringify(loginRequest)
    });
}