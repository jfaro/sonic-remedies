// TODO: Look into modifying, I believe multipleSelect isn't a usable option anymore.
export interface IQuestion {
    idx: number,
    prompt: string,
    type: 'text' | 'color' | 'mutipleSelect' | 'singleSelect'
}

export interface IMultipleChoice extends IQuestion {
    options: string[]
}

export interface IQuestionSet {
    title: string,
    admin: string,
    dateAdded: string,
    questions?: IQuestion[],
    questionCount: number,
}

/**
 * TODO: At this point I have no clue whether this ISurvey interface 
 * properly reflects the current structure of surveys. Modify if necessary.
 */
export interface ISurvey {
    title: string,
    admin: string,
    active: boolean,
    numTracks: number,
    setsPre: string[],
    setsMusic: string[],
    setsPost: string[],
    requirements: any[],
    responses: number,
    dateAdded: string
}