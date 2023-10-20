import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurentData } from './restaurent.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-restaurentdash',
  templateUrl: './restaurentdash.component.html',
  styleUrls: ['./restaurentdash.component.css']
})
export class RestaurentdashComponent implements OnInit {
  allRestaurantData:any;
  formValue!:FormGroup;
  page:Number = 1;
  totalLength:any;
  restaurantModelObj:RestaurentData = new RestaurentData;
  showAdd!:Boolean;
  showbtn!:Boolean;
  userFilter:any = {name:''};

  constructor(private api:ApiService, private fb:FormBuilder , private toast:NgToastService){

  }

  ngOnInit(): void {
      this.formValue = this.fb.group({
        name:['', Validators.required],
        email:['',Validators.required],
        mobaile:['',Validators.required],
        address:['',Validators.required],
        services:['',Validators.required]
      })
      this.GetAllRestaurantData();
  }

  //Get all restaurant data

  GetAllRestaurantData(){
    this.api.getAllRestaurant().subscribe((resp:any)=>{
        this.allRestaurantData = resp;
        console.log(this.allRestaurantData);
        
    })
  }

  clickaddresto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;  // forUpadare btn
  }

  addRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobaile = this.formValue.value.mobaile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(resp=>{
      this.toast.success({detail:'Update Message', summary:'Record Added successfully',duration:4000});
      this.formValue.reset();
      this.GetAllRestaurantData()

    },error=>{
      alert("something went wrong");
    })
  }

  // delete data 

  deleteRestaurantData(data:any){
      if(confirm(`Are you sure want delete records ?`))
      this.api.deleteRestaurant(data.id).subscribe(resp=>{
          this.toast.info({detail:'Delete notification' , summary:'Record deleted successfully', duration:4000});
          this.GetAllRestaurantData();
      })
  }

  // edit

  Oneditresto(data:any){
      this.restaurantModelObj.id = data.id;
      this.showAdd = false; // add hide btn
      this.showbtn = true;  // update

      this.formValue.controls['services'].setValue(data.services);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobaile'].setValue(data.mobaile);
      this.formValue.controls['name'].setValue(data.name);

  }

  updateRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobaile = this.formValue.value.mobaile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj , this.restaurantModelObj.id).subscribe(resp=>{
      this.toast.success({detail:'Update Message', summary:'Update successfully',duration:4000});
      this.formValue.reset();
      this.GetAllRestaurantData();
    },error =>{
      alert('something went wrong');
    })
  }

  //logout

  logOut(){

    localStorage.removeItem('token');
    this.toast.success({detail:'Update Message',summary:'Logged successfully',duration:4000});
  }
  
    
}
