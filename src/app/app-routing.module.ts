import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './componentes/hub/hub.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'hub',loadChildren:()=> import('./componentes/hub/hub.module').then(x=>x.HubModule)},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
