import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { DataService } from 'src/app/services/data.service';
 
@Component({
 selector: 'app-add',
 templateUrl: './add.component.html',
 styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 
  form:FormGroup  
 constructor(public data:DataService,public router:Router) { 
 
this.form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, { validators: [Validators.required] }),
    age: new FormControl(null, { validators: [Validators.required] }),
    date: new FormControl(null, { validators: [Validators.required] }),
    roll: new FormControl(null, { validators: [Validators.required] }),
    email: new FormControl(null, { validators: [Validators.required] }),
    gender: new FormControl(null, { validators: [Validators.required] }),
  
});
 }
 
 
 students:Student[]=[];

 
 ngOnInit(): void {}

onSubmit()
 {
   console.log(this.form.value)
   const student:Student = {
     name:this.form.value.name,
     age:this.form.value.age,
     email:this.form.value.email,
     id:null,
     rollNo:this.form.value.roll,
     isMale:this.form.value.gender,
     date:this.form.value.date,
   }
   console.log(student)
   this.data.addStudent(student).subscribe(data=>
    {
      this.router.navigate(["/display"])
    }
    ,
      err=>
      {
        console.log(err)
      })
 
}
}

