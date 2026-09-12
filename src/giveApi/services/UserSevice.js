import { Delete, get, Patch, Post } from "../utils/request.js";
export const getUserList = async () => {
    const result = await get('users');
    return result;
}
export const createUser = async (option) => {
    const result = await Post('users', option);
    return result;
}

export const deleteUser = async (id) => {
    const result = await Delete('users', id);
    return result;
}
export const EditUser = async (id, option) => {
    const result = await Patch('users', id, option);
    return result;
}