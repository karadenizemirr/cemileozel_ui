import { Injectable } from "@angular/core";
import axios, { AxiosRequestConfig } from "axios";
import { environment } from "src/environment.prod";
import { AlertifyService } from "./alertify.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private baseURL = environment.apiUrl;


    constructor(
        private alertify: AlertifyService,
        private router: Router
    ){}

    jwtHelper = new JwtHelperService()
    userToken:any

    // House Operations 

    async getHouseData(){
        try {
            const response = await axios.get(this.baseURL + "/house/all")
            return response.data
        }catch(err){
            this.alertify.danger("Bir sorun meydana geldi.")
        }
    }

    async getHouseDataWithId(id:number){
        try{
            const response = await axios.get(this.baseURL + "/house/get/" + id)
            return response.data
        }catch(err){
            this.alertify.danger("Bir sorun meydana geldi.")
        }
    }

    // Appoinment Operations
        // Add Appoinment
    
    async addAppointment(appoinmentData: any){
        try {
            const response = await axios.post(this.baseURL + '/appoinment/add',appoinmentData)
            return response.data

        }catch(err){
            this.alertify.danger('Randevu oluşturulamadı.')
        }
    }

        // All Appoinment
    async getAllAppoinment(){
        try{

            const response = await axios.get(this.baseURL + '/appoinment/all')
            return response.data

        }catch(err){
            this.alertify.danger('Randevular getirilirken bir sorun meydana geldi.')
        }
    }

    // Get By Id
    async getByIdAppoinment(id:number){
        try{
            const response = await axios.get(this.baseURL + '/appoinment/get/' + id)
            return response.data
        }catch(err){
            this.alertify.danger('Randevu getirilirken bir sorun meydana geld.')
        }
    }

    // Secure Update
    async secureUpdate(data:any, id:number){
        try{

            const response = await axios.post(this.baseURL + '/appoinment/secure/update/' + id, data)
            return response.data

        }catch(err){
            this.alertify.danger('3D Güvenli ödeme yapılırken bir sorun meydana geldi.')
        }
    }

    // Auth 
    async userAuth(username:string, password:string){

        try{
            
            const response = await axios.post(this.baseURL + '/user/login', {username: username, password: password})
            
            console.log(response.data)
            if(response.data.token){
                this.saveToken(response.data.token)
                this.userToken = response.data.token
                this.alertify.success('Giriş işlemi başarılı')
                this.router.navigate(['/admin'])
                
            }else{
                this.alertify.danger('Giriş işlemi yapılamadı.')
            }


        }catch(err){
            this.alertify.danger('Giriş işlemi başarısız oldu.')
        }

    }

    saveToken(token:any){
        try{
            localStorage.setItem('token', token)
        }catch(err){
            console.log('token save error')
        }
    }

    isLoggedIn(): boolean {
        try {
          const isTokenExpired = this.jwtHelper.isTokenExpired(this.userToken);
          return !isTokenExpired;
        } catch (err) {
          console.log('Not logged in');
          return false;
        }
      }

    logout(){
        try{
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
        }catch(err){
            this.alertify.success('Çıkış işlemi başarılı')
        }
    }

    getToken(){
        return this.userToken
    }

    // House Operations
    async getAllHouse(){
        try{
            const response = await axios.get(this.baseURL + '/house/all')
            return response.data
        }catch(err){
            console.log('House data error')
        }
    }

    // Save House
    async addHouse(houseData:any){
        try{
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            const response = await axios.post(this.baseURL + '/house/add', houseData, {headers})
            return response.data

        }catch(err){
            this.alertify.warning('Ev eklenirken bir sorun meydana geldi')
        }
    }

    // IP Detext
    async ipDetect(){
        try{
            const IP_URL = "https://api.ipify.org/?format=json"

            const response = await axios.get(IP_URL)
            return response.data
        }catch(err){
            console.log('app error')
        }
    }
}