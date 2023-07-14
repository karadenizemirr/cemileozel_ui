import { Component, DoCheck, Input, OnChanges, OnInit,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/customService/alertify.service';
import { ApiService } from 'src/app/customService/api.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
  
})
export class ProcessComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ){
    
  }

  receivedData: any= false
  appoinmentData:any
  secureData: any = [];
  id!:any | null;
  @Input() saveSecureData: any = {};
  previousSaveSecureData: any;

  // Update Form
  secureUpdateForm!: FormGroup
  secureUpdateData:any



  async ngOnInit() {
    // Get Forms
   this.createSecureUpdateForm()
    // Get Appoinment Data

    this.id = this.route.snapshot.params['id']
    
    this.apiService.getByIdAppoinment(this.id)
        .then(async result => {
          this.appoinmentData =await result.data;
        })
        .catch(err => {
          this.alertifyService.danger('Bir sorun meydana geldi')
        });
    
  }

  private isEqual(obj1: any, obj2: any): boolean {
    // Check if objects are equal by stringifying them and comparing the resulting strings
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  // Create Form
  createSecureUpdateForm(){
    this.secureUpdateForm = this.formBuilder.group({
      success:[""],
      notSucess:[""],
      smsMessage:[""],
      errorMessage:[""]
    })
  }

  updateSecure(){
    if (this.secureUpdateForm.valid){
      const formData = Object.assign({}, this.secureUpdateForm.value)

      this.saveSecureData = {
        code: formData.errorMessage,
        message: formData.smsMessage,
        status: formData.success ? true: false
      }

      // Update Operations
      this.apiService.secureUpdate(this.saveSecureData, this.id)

    }
  }
  

}
