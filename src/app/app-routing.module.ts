import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { UploadComponent } from './components/upload/upload.component';
const routes: Routes = [
 
  {path:"",
  component:DisplayComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
