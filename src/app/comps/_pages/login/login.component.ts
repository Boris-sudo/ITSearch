import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";
import {UserService} from "../../../services/api/user.service";
import {UserLoginModel} from "../../../models/api/user-login.model";
import {LocalstorageService} from "../../../services/localstorage.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../../_models/styles/input-design.css'],
})
export class LoginComponent {
    public email: string = '';
    public password: string = '';

    constructor(
        public router: RoutingService,
        private localstorage: LocalstorageService,
        private user_service: UserService,
    ) {
    }

    login() {
        let data: UserLoginModel = { email: this.email, password: this.password};
        this.user_service.login(data).subscribe(
            resp => {
                this.localstorage.set('user', resp.access);
                this.router.navigate('');
            }
        )
    }
}
