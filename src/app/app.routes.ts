import { Routes } from '@angular/router';
import {ShortsComponent} from "./comps/_pages/shorts/shorts.component";
import {LoginComponent} from "./comps/_pages/login/login.component";
import {RegistrationComponent} from "./comps/_pages/registration/registration.component";

export const routes: Routes = [
    {path: '', component: ShortsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
];
