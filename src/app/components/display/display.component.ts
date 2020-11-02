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
      }
    )
  }

  public onDelete(id:string)
  {
    console.log(id)
    this.router.navigate(["/delete",id])
  }
  public onUpdate(id:string)
  {
    console.log(id)
    this.router.navigate(["/update",id])
  }
  }
  


 
