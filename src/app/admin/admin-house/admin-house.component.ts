import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/customService/alertify.service';
import { ApiService } from 'src/app/customService/api.service';

@Component({
  selector: 'app-admin-house',
  templateUrl: './admin-house.component.html',
  styleUrls: ['./admin-house.component.css']
})
export class AdminHouseComponent implements OnInit{

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ){}

  
  allHouse:any
  addHouseForm!: FormGroup
  houseFormData: any
  uploadFiles: File[] = []
  formData: any

  async ngOnInit() {
    this.createAddHouseForm()
    this.formData = new FormData()
    
    // Get All House
    this.allHouse = await this.apiService.getAllHouse()
    
    for (let house of this.allHouse.data){
      console.log(house.houseProperty.person)
    }
  }

  createAddHouseForm(){
    this.addHouseForm = this.formBuilder.group({
      title:["",Validators.required],
      description:[""],
      location:[""],
      weekendPrice:[""],
      weekdayPrice:[""],
      bad:[""],
      houseArea:[""],
      person:[""],
      houseType:[""]
    })
  }

  addHouse(){
    try{
      if (this.addHouseForm.valid){
        this.houseFormData = Object.assign({}, this.addHouseForm.value)
        
        for (const key in this.houseFormData){
          if(this.houseFormData.hasOwnProperty(key)){
            this.formData.append(key, this.houseFormData[key])
          }
        }
      
        if(this.uploadFiles){
          for(let i = 0; i<this.uploadFiles.length; i++){
            this.formData.append("image", this.uploadFiles[i], this.uploadFiles[i].name)
          }
        }
        
        this.apiService.addHouse(this.formData)
        this.addHouseForm.reset()
        this.alertifyService.success('Ev başarıyla eklendi.')
      }
    }catch(err){
      this.addHouseForm.reset()
    }
  }

  onFileSelected(event:any){
    const file: File[] = event.target.files
    this.uploadFiles = file
  }

}
