export class Utilities {

    constructor() { }
    public static cleanStorage() {
        sessionStorage.clear();
    }
    public static getUsername(): string { return sessionStorage.getItem('username') || ''; }
    public static setUsername(value: any) { return sessionStorage.setItem('username', value); }

    public static getFullName(): string { return sessionStorage.getItem('fullName') || ''; }
    public static setFullName(value: any) { return sessionStorage.setItem('fullName', value); }

    public static getRole(): string { return sessionStorage.getItem('role') || ''; }
    public static setRole(value: any) { return sessionStorage.setItem('role', value); }
}