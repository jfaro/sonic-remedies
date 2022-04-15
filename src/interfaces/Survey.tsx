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
    active: boolean,
    questions: IQuestion[],
    responses: any[],
    trackIds: string[],
    createdBy: string,
    createdOn: string
}