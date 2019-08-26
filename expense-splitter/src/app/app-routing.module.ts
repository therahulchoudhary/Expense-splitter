import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SplitFormComponent } from './split-form/split-form.component';


const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'splitform',component:SplitFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
