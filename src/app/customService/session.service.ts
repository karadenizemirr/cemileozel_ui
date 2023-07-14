import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class SessionService {
    constructor(){}

    setSettionData(key:string, value:any): void {
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    getSettionData(key:string): any {
        const value:any = sessionStorage.getItem(key)
        return JSON.parse(value)
    }

    removeSession(key:string):void {
        try{
            sessionStorage.removeItem(key)
        }catch(err){
            console.log('Session remove error')
        }
    }
}