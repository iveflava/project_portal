export type TypeSurvey = {
    _id: string,
    heading: string,
    answers: {
        _id: string,
        text: string,
    }[],
    userVoted: boolean,
};
