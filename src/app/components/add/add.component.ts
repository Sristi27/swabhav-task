import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { DataService } from 'src/app/services/data.service';
 
@Component({
 selector: 'app-add',
 templateUrl: './add.component.html',
 styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 
 constructor(public data:DataService,public router:Router) { }
 
 student_name:string
 student_email:string
 student_age:number
 student_date:string
 student_gender:string
 student_roll:number
 
 students:Student[]=[];
 ngOnInit(): void {

  // this.data.getallStudents().subscribe(
  //   data=>
  //   {
  //     for (let i=0;i<Object.keys(data).length;i++)
  //     {
  //       this.students.push(data[i])
  //     }
  //   })
  
   // console.log(this.router.getCurrentNavigation().extras.state.student);
 
  // if(this.router.url==="/edit")
  // {
  //  console.log( window.history.state.student[0]);
  //  this.student_name=window.history.state.student[0].name
  //  this.student_email=window.history.state.student[0].email
  //  this.student_age=window.history.state.student[0].age
  //  this.student_date=window.history.state.student[0].date
  //  this.student_id=window.history.state.student[0].id
  //  this.student_gender=window.history.state.student[0].isMale
  //  this.student_roll=window.history.state.student[0].rollNo
  // }
 }
onsubmit(f:NgForm)
 {
   console.log(f.value)
   const student:Student = {
     name:f.value.name,
     age:f.value.age,
     email:f.value.email,
     id:null,
     rollNo:f.value.roll,
     isMale:f.value.gender,
     date:f.value.date,
   }
   console.log(student)
   this.data.addStudent(student).subscribe(data=>this.router.navigate(["/"]))
 
}
}

