import { Delete, get, Patch, Post } from "../utils/request.js";
export const getProductList = async () => {
    const result = await get('products');
    return result;
}
export const createProduct = async (option) => {
    const result = await Post('products', option);
    return result;
}

export const deleteProduct = async (id) => {
    const result = await Delete('products', id);
    return result;
}
export const EditProduct = async (id, option) => {
    const result = await Patch('products', id, option);
    return result;
}