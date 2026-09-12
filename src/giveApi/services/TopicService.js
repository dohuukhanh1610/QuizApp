import { Delete, get, Patch, Post } from "../utils/request.js";
export const getTopicList = async () => {
    const result = await get('topics');
    return result;
}
export const createTopic = async (option) => {
    const result = await Post('topics', option);
    return result;
}

export const deleteTopic = async (id) => {
    const result = await Delete('topics', id);
    return result;
}
export const EditTopic = async (id, option) => {
    const result = await Patch('topics', id, option);
    return result;
}