import { Delete, get, Patch, Post } from "../utils/request.js";
export const getQuestions = async () => {
    const result = await get('questions');
    return result;
}
export const createQuestion = async (option) => {
    const result = await Post('questions', option);
    return result;
}

export const deleteQuestion = async (id) => {
    const result = await Delete('questions', id);
    return result;
}
export const EditQuestion = async (id, option) => {
    const result = await Patch('questions', id, option);
    return result;
}
export const getQuestionsByCategory = async (categoryId) => {
    const result = await get(`questions?idCategory=${categoryId}`);
    return result;
}