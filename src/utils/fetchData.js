var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
 
const apiGet=(url_api,token) =>{
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url_api, true);
        if(!(token==null))
        xhttp.setRequestHeader("Authorization", "Bearer " + token);

        xhttp.onreadystatechange = (() => {
            
        if (xhttp.readyState === 4) {   
            
            (xhttp.status === 200) 
            ? resolve(JSON.parse(xhttp.responseText))
            : reject(new Error('Error', url_api))
        };
        });
        xhttp.send();
    })
}

const apiPost=(url_api,token,body) =>{
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url_api, true);
        if(!(token==null))
        xhttp.setRequestHeader("Authorization", "Bearer " + token);

        xhttp.onreadystatechange = (() => {
            
        if (xhttp.readyState === 4) {   
            
            (xhttp.status === 200) 
            ? resolve(JSON.parse(xhttp.responseText))
            : reject(new Error('Error', url_api))
        };
        });
        xhttp.send();
    })
}

 module.exports = [apiGet,apiPost];