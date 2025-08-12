export const saveJWT = (token: string) => {
    return localStorage.setItem('token', token);
}

export const getJWT = (): string | null => {
    return localStorage.getItem('token');
}

export const removeJWT = () => {
    return localStorage.removeItem('token');
}