import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environment.prod";


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private baseURL = environment.apiUrl;


    constructor(){}

    // House Operations 

    async getHouseData(){
        try {
            const response = await axios.get(this.baseURL + "/house/all")
            return response.data
        }catch(err){
            console.log('Error')
        }
    }
}