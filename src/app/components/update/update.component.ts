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
  student_id="";
  male="";

  constructor(private activatedRoute: ActivatedRoute, private data: DataService,private router:Router) {

    
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, { validators: [Validators.required] }),
      age: new FormControl(null, { validators: [Validators.required] }),
      date: new FormControl(null, { validators: [Validators.required] }),
      rollNo: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ] }),
      isMale: new FormControl(),
   
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
      this.form.controls['isMale'].setValue(data[0].isMale);
      this.form.controls['rollNo'].setValue(data[0].rollNo);
      
      if(data[0].isMale==true) this.male="true";
      else this.male="false";
  
    })

    this.form.controls['id'].setValue(this.student_id);
  }
 
}
  public onUpdate() {
    if(this.student_id!=null)
    {
      const student=this.form.value;
      console.log(this.form.value)
      this.data.updateStudent(student).subscribe(
        data=>{
          this.router.navigate(['/display'])
          
      },
      err=>
      {
        alert(err)
      })
    }
    

  }

}

