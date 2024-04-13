import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    public email: string = '';
    public password: string = '';

    constructor(
        public router: RoutingService,
    ) {
    }

    login() {
        // TODO
    }
}
