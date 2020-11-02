import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../models/student.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
   })

export class DataService {

    students=[];
    newStudents:Subject<Student[]>;

    baseUrl= "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students";

    constructor(private http:HttpClient){}

   getallStudents():Observable<Student[]>
    {
        return this.http.get<Student[]>(`${this.baseUrl}`);
    }

    deleteStudent(id:string)
    {
        return this.http.delete<Student>(`${this.baseUrl}/${id}`);
    }
    
    addStudent(student:Student)
    {
       return this.http.put<Student>(`${this.baseUrl}`,
       JSON.stringify(student), 
       {'headers':new HttpHeaders({'Content-Type' : 'application/json'})});
    }
  
    getStudentById(id:string):Observable<Student>
    {
        return this.http.get<Student>(`${this.baseUrl}/${id}`)
    }

    updateStudent(student:Student)
    {
       return this.http.put<Student>(`${this.baseUrl}/${student.id}`,
       JSON.stringify(student), 
       {'headers':new HttpHeaders({'Content-Type' : 'application/json'})});
    }
}


