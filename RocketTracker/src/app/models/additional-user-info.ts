export interface AdditionalUserInfo {
    name: string,
    birthday: firebase.firestore.Timestamp,
    languageKey?: string,
}