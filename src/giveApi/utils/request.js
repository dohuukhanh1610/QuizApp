const API_DOMAIN = 'http://localhost:3001/';
export const get = async (path) => {
    const res = await fetch(`${API_DOMAIN}${path}`)
    const data = await res.json();
    return data;
}
export const Post = async (path, option) => {
    const fetchApi = await fetch(`${API_DOMAIN}${path}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(option)
    })
    const data = await fetchApi.json();
    return data;
}
export const Delete = async (path, id) => {
    const fetchApi = await fetch(`${API_DOMAIN}${path}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
    const data = await fetchApi.json();
    return data;
}
export const Patch = async (path, id, option) => {
    const fetchApi = await fetch(`${API_DOMAIN}${path}/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(option)
    })
    const data = await fetchApi.json();
    return data;
}