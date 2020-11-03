import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, RouterEvent } from '@angular/router';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(public data:DataService,private router:Router) { }

  students=[];
  student_id=""

  ngOnInit(){
    this.getStudents();
  }

  public getStudents()
  {
    this.data.getallStudents().subscribe
    (data=>
      {
        this.students=data;
        console.log(this.students);
      },
      err=>
      {
        console.log(err)
      }
    )
  }

  assignID(id:string)
  {
    this.student_id=id;
  }

  public onDelete()
  {
    console.log(this.student_id)
    this.router.navigate(["/delete",this.student_id])
  }
  public onUpdate(id:string)
  {
    console.log(id)
    this.router.navigate(["/update",id])
  }
  }
  


 
