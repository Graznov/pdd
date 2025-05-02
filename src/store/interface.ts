
export interface props_mission {
    image: string;
    question: string;
    ticket_category: string;
    answers: { answer_text: string, "is_correct": boolean }[];
    correct_answer: string;
    topic: string[];
    id: string;
    title?: string;
    ticket_number?: string;
    answer_tip: string;
}

export interface quest {
    number: number,
    response: boolean,
    status: 'red'|'green'|'none',
    yourResponse:number|null,
    image: string;
    question: string;
    ticket_category: string;
    answers: { answer_text: string, "is_correct": boolean }[];
    correct_answer: string;
    topic: string[];
    id: string;
    title?: string;
    ticket_number?: string;
    answer_tip: string;
}

export interface Cube {
    number:number,
    id:string,
    response:number|null,
    status:'red'|'green'|'none'
}

export interface searcheState {
    searchArrQuest : props_mission[]
    searchText:string
}

export interface userData {
    entrance:boolean,
    userName: string,
    // userEmail: string,
    userPassword: string,
    starQuestions: string[],
    errorQuestions: string[]
}
