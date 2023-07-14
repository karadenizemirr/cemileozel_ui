import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
    providedIn: 'root'
})

export class AlertifyService {
    constructor(){
        alertify.set('notifier', 'position', 'top-right')
    }

    success(message:string){
        alertify.success(message)
    }

    warning(message:string){
        alertify.warning(message)
    }

    danger(message:string){
        alertify.error(message)
    }

    info(message:string){
        alertify.info(message)
    }
}