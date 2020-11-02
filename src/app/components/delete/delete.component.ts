import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private data:DataService,private router:Router) { }

  id:string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      ()=>
      {
        this.id=this.activatedRoute.snapshot.paramMap.get("id");
        console.log(this.id)
        this.data.deleteStudent(this.id).subscribe(
          data=>this.router.navigate(["/"])
        )
      }
    )
  }

}
