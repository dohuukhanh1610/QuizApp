export const CheckUser = (user = {}) => {

    return {
        type: 'CHECK_USER',
        payload: user
    }
}
export const SaveAnswer = (answer = {}) => {
    return {
        type: 'SAVE_ANSWER',
        payload: answer
    }
}