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
    rollNo: new FormControl(null, { validators: [Validators.required]}),
    email: new FormControl(null, { validators:[
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ] }),
    isMale: new FormControl(),
  
});
 }
 
 
 students:Student[]=[];

 
 ngOnInit(): void {}

onSubmit()
 {
   console.log(this.form.value)
   const student:Student = this.form.value;
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

