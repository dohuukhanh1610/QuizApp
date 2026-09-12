const SaveAnswers = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_ANSWER':
            return action.payload;

        default:
            return state;
    }
};

export default SaveAnswers;