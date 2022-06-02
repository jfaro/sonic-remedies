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

export interface ISurvey {
    title: string,
    admin: string,
    active: boolean,
    questionSets: string[],
    parameters: any[],
    dateAdded: string
}