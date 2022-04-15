export interface IQuestion {
    idx: number,
    prompt: string,
    type: 'text' | 'color' | 'mutipleSelect' | 'singleSelect'
}

export interface IMultipleChoice extends IQuestion {
    options: string[]
}

export interface ISurvey {
    title: string,
    admin: string,
    active: boolean,
    questions: IQuestion[],
    responses: any[],
    trackIds: string[],
    dateAdded: string
}