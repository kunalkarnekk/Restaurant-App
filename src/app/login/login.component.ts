import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formValue!:FormGroup;
    constructor(private fb:FormBuilder , private http:HttpClient , private router:Router, private toast:NgToastService){}

    ngOnInit():void{
      this.formValue = this.fb.group({
        email:['',Validators.required],
        password:['',Validators.required]
      });
    }


    login(){
        this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
          const user = res.email === this.formValue.value.email && res.password === this.formValue.value.password

          if(user){
            // alert("User Login Successfully");
            this.toast.success({detail:'Success Message', summary:'User Login successfully', duration:9000})
            this.formValue.reset();
            this.router.navigate(['restaurant']);
            localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
            this.formValue.value.email? localStorage.setItem('usertype','employe'):''
          }
          else{
            // alert("User Not Found");
            this.toast.error({detail:'Error Message', summary:'User not found with these credentials' , duration:8000});
          }
        },error=>{
          // alert("somthing went Wrong");
          this.toast.warning({detail:'Error Message', summary:'Somthing went Wrong',duration:8000});
        })
    }
}

