import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private data: DataService,private router:Router) { }

  student_name: string = ""
  student_email: string = ""
  student_age: number = 0
  student_date: string =""
  student_id: string 
  student_gender: string =""
  student_roll: number = 0

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      ()=>
      {
        this.student_id=this.activatedRoute.snapshot.paramMap.get("id");
        this.fillDetails();
      }
    
    )
  }
public fillDetails()
{
  if(this.student_id!=null)
  {
    this.data.getStudentById(this.student_id).subscribe(data => {
      this.student_name = data[0].name;
      this.student_age = data[0].age;
      this.student_email = data[0].email;
      this.student_roll = data[0].rollNo;
      this.student_gender = data[0].isMale;
      this.student_date = data[0].date;
  
    })
  }
 
}
  public onupdate() {
    if(this.student_id!=null)
    {

      const student:Student = {
        name:this.student_name,
        age:this.student_age,
        email:this.student_email,
        id:this.student_id,
        rollNo:this.student_roll,
        isMale:this.student_gender,
        date:this.student_date,
      }
      this.data.updateStudent(student).subscribe(data=>{
         this.router.navigate(["/"])
      })
    }
    

  }
}

