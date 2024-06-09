import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { RegisterKurumsalComponent } from './components/registerkurumsal/registerkurumsal.component';
import { ProfileComponent } from './components/profile/profile.component'; // Yeni import


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registerkurumsal', component: RegisterKurumsalComponent },
    { path: 'home', component: HomeComponent },
    { path: 'task-list', component: TaskListComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: 'home', pathMatch:'full' },

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export default routes;