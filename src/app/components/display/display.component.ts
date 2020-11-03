import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  navigationSubscription;
  constructor(public data:DataService,private router:Router,private route:ActivatedRoute) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getStudents();
      }
    });
  }

  students=[];
  student_id=""

  ngOnInit(){
    // this.getStudents();
    // if(this.route.snapshot.paramMap.get('previousUrl')=="update")
    // window.location.reload()
  }

  public getStudents()
  {
    this.data.getallStudents().subscribe
    (data=>
      {
        console.log(typeof(data[0]['isMale']))
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

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }
  }
  


 
