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
    // disabled:boolean
}

export interface Cube {
    number:number,
    response:number|null,
    status:'red'|'green'|'none'
}
