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
        Validators.pattern("[^ @]*@[^ @]*")
      ] }),
      isMale: new FormControl({validators:[Validators.required]}),
    
  });
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
      
      this.form.setValue(
        {
          name:data[0].name,
          age:data[0].age,
          email:data[0].email,
          isMale:data[0].isMale,
          rollNo:data[0].rollNo,
          date:data[0].date,
          id:this.student_id

        }
      )
      if(data[0].isMale==true) this.male="true";
      else this.male="false";
  
    })

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

