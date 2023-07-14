import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class CustomCookieService {
    private secretKey = "thebungalov"

    constructor(private ngxCookieService: CookieService) { }

    setEncryptedCookie(
        name: string, 
        value: any, 
        expires?: number | Date, 
        path?: string, 
        domain?: string, 
        secure?: boolean, 
        sameSite?: 'Lax' | 'Strict' | 'None') {
        const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
        this.ngxCookieService.set(name, encryptedValue, expires, path, domain, secure, sameSite);
    }

    getDecryptedCookie(name: string) {
        const encryptedValue =  this.ngxCookieService.get(name);
        const decryptedBytes =  CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
        const decryptedValue = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return decryptedValue;
    }

    deleteCookie(name: string, path?: string, domain?: string) {
        this.ngxCookieService.delete(name, path, domain);
    }
}