import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  form: FormGroup;

  constructor(public data: DataService, private router: Router, private route: ActivatedRoute) {

    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, {
        validators:
          [Validators.required,
          Validators.pattern(/^[a-zA-Z]+([a-zA-Z\s*]?)+$/)
          ]
      }),
      age: new FormControl(null, {
        validators:
          [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
      }),
      date: new FormControl(null, {
        validators:
          [Validators.required,
          Validators.pattern(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
          ]
      }),
      rollNo: new FormControl(null, {
        validators:
          [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ]
      }),
      isMale: new FormControl('',{ validators: [Validators.required] }),

    });
  }

  students = [];
  delete_ID="";
  upadte_ID="";
  male="";

  ngOnInit() { this.getStudents(); }

  public getStudents() {
    this.data.getallStudents().subscribe
      (data => {
        console.log(typeof (data[0]['isMale']))
        this.students = data;
        console.log(this.students);
      },
        err => {
          console.log(err)
        }
      )
  }


  onClose()
  {
    this.form.reset();
  }

  deleteId(id: string) {
    this.delete_ID=id;
  }

  updateId(id:string)
  {
    this.upadte_ID=id;
    this.fillDetails();
  }

  public onDelete() {
    console.log(this.delete_ID);
    this.data.deleteStudent(this.delete_ID).subscribe(
      data=>
      {

      alert("Student deleted successfuly");
        this.getStudents();
      },
      err=>
      {
        console.log(err)
      }
    )
  }

  
  public fillDetails()
  {

    if(this.upadte_ID!="")
    {
      this.data.getStudentById(this.upadte_ID).subscribe(data => {
      
        if(data[0].isMale==true)
        this.male="male"
        else
        this.male="female"

        this.form.setValue(
          {
            name:data[0].name,
            age:data[0].age,
            email:data[0].email,
            isMale:this.male,
            rollNo:data[0].rollNo,
            date:data[0].date,
            id:this.upadte_ID
  
          }
        )
      })
    }
    
  }

  public onUpdate() {

    // this.fillDetails(this.student_id);
    const student = this.form.value;
    console.log(this.form.value)
    this.data.updateStudent(student).subscribe(
      data => {
        this.form.reset();
        alert("Student updated successfuly");
        this.getStudents();

      },
      err => {
        alert(err)
      })
  }

  public onAddStudent()
  
 {
   console.log(this.form.value)
   if(this.form.get('isMale').value=="male")
   {
      this.form.patchValue(
        {
          'isMale':true
        }
      )
   }
   else if(this.form.get('isMale').value=="female"){
     this.form.patchValue(
       {
         'isMale':false
       }
     )
     }
   

   const student:Student = this.form.value;
   console.log(student)
   this.data.addStudent(student).subscribe(data=>
    {

      this.form.reset();
      alert("Student added successfuly");
      this.getStudents();
    }
    ,
      err=>
      {
        alert(err)
        console.log(err)
      })
 
}
  





}




