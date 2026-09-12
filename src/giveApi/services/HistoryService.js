import { Delete, get, Patch, Post } from "../utils/request.js";
export const getHistory = async (userId) => {
    const result = await get(`history?userId=${userId}`);
    return result;
}
export const createHistory = async (option) => {
    const result = await Post('history', option);
    return result;
}

export const deleteHistory = async (id) => {
    const result = await Delete('history', id);
    return result;
}
export const EditHistory = async (id, option) => {
    const result = await Patch('history', id, option);
    return result;
}