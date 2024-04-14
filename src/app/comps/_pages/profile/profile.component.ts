import {Component} from '@angular/core';
import {UserService} from "../../../services/api/user.service";
import {ProfileModel} from "../../../models/api/profile.model";
import {NgForOf} from "@angular/common";
import {RoutingService} from "../../../services/routing.service";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
    public profile: ProfileModel = { name: '', city: '', experience: 0, salary: 0, education: 0, email: '', specialization: '',};
    public profile_keys: string[] = [];

    constructor(
        private user_service: UserService,
        private router: RoutingService
    ) {
        this.user_service.get().subscribe(
            resp => {
                this.profile = resp;
                for (const key in this.profile) if (key !== 'id') this.profile_keys.push(key);
                console.log(this.profile_keys)
            }, error => {
                this.router.navigate('login')
            }
        );
    }

    getEducation(e: number) {
        if (e === 0) return 'нет';
        else if (e === 1) return 'среднее';
        else return 'высшее';
    }
}
