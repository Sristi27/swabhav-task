import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { DeleteComponent } from './components/delete/delete.component';
import { DisplayComponent } from './components/display/display.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  // {
  //   path:"",
  //   pathMatch:"full",
  //   component:HomeComponent
  // },

  {path:"",
  pathMatch:"full",
  component:DisplayComponent
},
{
  path:"delete/:id",
  component:DeleteComponent
},
{
  path:"update/:id",
  component:UpdateComponent
},
{
  path:"add",
  component:AddComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
