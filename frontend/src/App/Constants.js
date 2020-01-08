export const apiUrl = "http://localhost:4004/api";

export const defaultAxiosOptions = {
    timeout: 10000,
    crossDomain: true,
    cache: "no-cache",
    referrer: "no-referrer",
    credentials: "*omit",
    mode: "no-cors",
    form: {
        "Content-Type": "application/json"
    },
    responseType: "json"
};
