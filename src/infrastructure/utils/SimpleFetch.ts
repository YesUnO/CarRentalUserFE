const apiUrl = process.env.API_URL;


export const request = () => {
    const url = apiUrl as string + "/api/stripe/CheckOutApi";
    const request = fetch(url,{
        method: "POST",
        redirect:"follow"
    })
    request.then(x=> {
        
        console.log(x.headers.get("location"));
    })
}
