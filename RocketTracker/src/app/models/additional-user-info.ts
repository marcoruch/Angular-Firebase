export interface AdditionalUserInfo {
    name: string,
    age?: number,
    birthday: firebase.firestore.Timestamp,
    languageKey?: string,
}