import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    myform!:FormGroup;
    constructor( private fb:FormBuilder ,private http:HttpClient , private router:Router){

    }

    ngOnInit():void{
        this.myform = this.fb.group({
          name:['',Validators.required],
          email:['',Validators.required],
          mobaile:['',Validators.required],
          password:['',Validators.required]
        });
    }

    signUp(){
      this.http.post<any>("http://localhost:3000/signup", this.myform.value).subscribe(res=>{
        alert("You are register successfully !");
        this.myform.reset();
        this.router.navigate(['login']);
      },error=>{
        alert('something went wrong!!')
      })
    }
}
