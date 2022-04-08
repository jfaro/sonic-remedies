interface Question {
    prompt: string,
    type: 'text' | 'color' | 'bool'
}

export interface Survey {
    title: string,
    tracksIds: string[],
    questions: Question[],
    responses: any[],
    active: boolean,
    dateCreated: string,
}