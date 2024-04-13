import { Routes } from '@angular/router';
import {ShortsComponent} from "./comps/_pages/shorts/shorts.component";
import {LoginComponent} from "./comps/_pages/login/login.component";
import {RegistrationComponent} from "./comps/_pages/registration/registration.component";
import {SearchComponent} from "./comps/_pages/search/search.component";

export const routes: Routes = [
    {path: '', component: ShortsComponent},
    {path: 'search', component: SearchComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
];
