


export const POSTAPIRequest = async (methodType, url, data = {}) => {

    let sendJsonString = JSON.stringify(data);

    console.log(`${methodType} json string : ` + sendJsonString);

    let responce = await fetch(url, {
        method: methodType,
        mode: methodType === 'POST' ? 'no-cors' : null,
        headers: {
            'Accept': methodType === 'POST' ? 'application/json' : null,
            'Content-Type': 'application/json'
        },
        body: sendJsonString
    })

    let jsonData = await responce.json();

    return jsonData;
}

export const GETAPIRequest = async (pathUrl = "", array = []) => {

    let url = pathUrl.toString();
    if (array.length > 0) {
        url += '?';
        for (let index = 1; index < array.length; index += 2) {
            url += `${array[index - 1]}=${array[index]}${index < array.length - 1 ? "&" : ''}`
        }
    }
    console.log(url);
    let jsonData = null;
    let responce = await fetch(url).then(res => {
        jsonData = res.json();
    }).catch(err => { throw new Error(err) });

    //  if (jsonData.ExceptionMessage) throw new Error(`ExceptionType : ${jsonData.ExceptionMessage} | Message : ${jsonData.Message} | StackTrace : ${jsonData.StackTrace}`);

    return jsonData;
}

export const DELETEAPIRequest = async (pathUrl = "", array = []) => {

    let url = pathUrl.toString();
    url += '?';
    for (let index = 1; index < array.length; index += 2) {
        url += `${array[index - 1]}=${array[index]}${index < array.length - 1 ? "&" : ''}`
    }
    console.log("DELETE url : " + url);
    let responce = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let jsonData = await responce.json();

    if (jsonData.ExceptionMessage) throw new Error(`ExceptionType : ${jsonData.ExceptionMessage} | Message : ${jsonData.Message} | StackTrace : ${jsonData.StackTrace}`);

    return jsonData;
}

export const FetchLocalFile = async (url) => {
    let responce = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    let jsonData = await responce.json();
    return jsonData;
}