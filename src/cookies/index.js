export const setCookie = (name, value, hours) => {
    let date = new Date();

    date.setTime(
        date.getTime() + hours * 60 * 60 * 1000
    );

    document.cookie =
        `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
export function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}
export function deleteCookie(name) {
    document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}