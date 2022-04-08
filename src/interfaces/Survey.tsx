interface Question {
    prompt: string,
    type: 'text' | 'color' | 'bool'
}

export interface Survey {
    title: string,
    active: boolean,
    questions: Question[],
    responses: any[],
    trackIds: string[],
    createdBy: string,
    createdOn: string
}