export const STORAGE_KEYS = {
    PDD_MARAFON: '_arr0011',
    PDD_EXAM: '_arr0012',
    PDD_ACCESSTOKEN: '_elem0001',
    PDD_ID: '_dkhg007',

    PDD_REMOVE_LS: function cleanLS(){
        localStorage.removeItem(STORAGE_KEYS.PDD_ACCESSTOKEN)
        localStorage.removeItem(STORAGE_KEYS.PDD_EXAM)
        localStorage.removeItem(STORAGE_KEYS.PDD_ID)
        localStorage.removeItem(STORAGE_KEYS.PDD_MARAFON)
    }
};