import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  //inside export class
  
  arrayBuffer:any;
  file:File;

  onExcelSelect(event)
  {
    this.file=event.target.files[0];
    const fileReader=new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      // var data = new Uint8Array(this.arrayBuffer);
      // console.log(data)
      var arr = new Array();

      // for(var i = 0; i != data.length; ++i)
      // {
      //    arr[i] = String.fromCharCode(data[i]);
      // }
       
      var bstr = arr.join("");
     let workbook = XLSX.readFile(`uploads/${this.file.name}`)
    let worksheet = workbook.Sheets['Sheet1']
    let headers = {}
    let data = []
    for (let z in worksheet) {
        if (z[0] === '!') continue
        //parse out the column, row, and value
        let tt = 0
        for (let i = 0; i < z.length; i++) {
            // if (!isNaN(z[i])) {
            //     tt = i
            //     break
            // }
            tt = i
        }
        let col = z.substring(0, tt)
        let row = parseInt(z.substring(tt))
        let value = worksheet[z].v
        //store header names
        if (row == 1 && value) {
            headers[col] = value
            continue
        }
        if (!data[row]) data[row] = {}
        data[row][headers[col]] = value
    }
    // drop those first two rows which are empty
    data.shift()
    data.shift()
    console.log(data)
    const studentList = []
    data.map(object => {
        if (object['Year of Enrollment']) object['Year of Enrollment'] = parseInt(object['Year of Enrollment'])
        if (object['Semester']) object['Semester'] = parseInt(object['Semester'])
        if (object['Aadhar Number']) object['Aadhar Number'] = parseInt(object['Aadhar Number'])
        if (object['Phone Number']) object['Phone Number'] = parseInt(object['Phone Number'])
        if (object['Alternate Phone Number']) object['Alternate Phone Number'] = parseInt(object['Alternate Phone Number'])
        let obj = {
            "student_first_name": object['First Name'],
            "student_last_name": object['Last Name'],
            "student_branch": object['Branch'],
            "student_year": object['Year of Enrollment'],
            "student_semester": object['Semester'],
            "student_gender": object['Gender'],
            "student_email": object['Email'],
            "student_address": object['Address'],
            "student_linkedin_profile": object['Linkedin Profile'],
            "student_github_profile": object['Github Profile'],
            "student_aadhar_number": object['Aadhar Number'],
            "student_phone_number": object['Phone Number'],
            "student_date_of_birth": object['Date of Birth']
        }
        studentList.push(obj)
    })
    console.log(studentList)
  }
  fileReader.readAsArrayBuffer(this.file);
  console.log(fileReader)
  }

}
