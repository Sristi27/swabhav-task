import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form:FormGroup;
  student_id=""

  constructor(private activatedRoute: ActivatedRoute, private data: DataService,private router:Router) {

    
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      age: new FormControl(null, { validators: [Validators.required] }),
      date: new FormControl(null, { validators: [Validators.required] }),
      roll: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      gender: new FormControl(null, { validators: [Validators.required] }),
   
  })
}


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
      
      this.form.controls['name'].setValue(data[0].name);
      this.form.controls['age'].setValue(data[0].age);
      this.form.controls['email'].setValue(data[0].email);
      this.form.controls['date'].setValue(data[0].date);
      this.form.controls['gender'].setValue(data[0].isMale);
      this.form.controls['roll'].setValue(data[0].rollNo);
      
    
  
    })
  }
 
}
  public onUpdate() {
    if(this.student_id!=null)
    {

      const student:Student = {
        name:this.form.value.name,
        age:this.form.value.age,
        email:this.form.value.email,
        id:this.form.value.id,
        rollNo:this.form.value.roll,
        isMale:this.form.value.gender,
        date:this.form.value.date,
      }
      this.data.updateStudent(student).subscribe(
        data=>{
         this.router.navigate(["/display"])
      },
      err=>
      {
        console.log(err)
      })
    }
    

  }

}

