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
    name: new FormControl(null, { validators: 
      [Validators.required,
        Validators.pattern(/^[a-zA-Z]+([a-zA-Z\s*]?)+$/)
      ] }),
    age: new FormControl(null, { validators: 
      [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ] }),
    date: new FormControl(null, { validators: 
      [Validators.required,
        Validators.pattern(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
    ] 
    }),
    rollNo: new FormControl(null, { validators: 
      [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]}),
    email: new FormControl(null, { validators:[
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ] }),
    isMale: new FormControl({validators:[Validators.required]}),
  
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

