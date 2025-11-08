export const STORAGE_KEYS = {
    PDD_MARAFON: '_arr0011',
    PDD_EXAM: '_arr0012',

    PDD_EXAM_NO_ENTERED_ALL_TICKETS: '_EAXM_ALL_TICKETS',
    PDD_EXAM_NO_ENTERED_ONE_TICKET: '_EXAM_ONE_TICKET',

    PDD_ACCESSTOKEN: '_elem0001',
    PDD_ID: '_dkhg007',

    PDD_REMOVE_LS: function cleanLS(){
        localStorage.removeItem(STORAGE_KEYS.PDD_ACCESSTOKEN)
        localStorage.removeItem(STORAGE_KEYS.PDD_EXAM)
        localStorage.removeItem(STORAGE_KEYS.PDD_ID)
        localStorage.removeItem(STORAGE_KEYS.PDD_MARAFON)
        localStorage.removeItem(STORAGE_KEYS.PDD_EXAM_NO_ENTERED_ALL_TICKETS)
        localStorage.removeItem(STORAGE_KEYS.PDD_EXAM_NO_ENTERED_ONE_TICKET)
    },

    PDD_REMOVE_EXAM_TICKET: function cleanTicket(){
        localStorage.removeItem(STORAGE_KEYS.PDD_EXAM)
    },
};