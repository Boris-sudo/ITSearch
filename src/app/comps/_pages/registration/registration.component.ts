import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";
import {UserRegisterModel} from "../../../models/api/user-register.model";
import {LocalstorageService} from "../../../services/localstorage.service";
import {UserService} from "../../../services/api/user.service";

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        FormsModule
    ],
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css', '../../_models/styles/input-design.css']
})
export class RegistrationComponent implements AfterViewInit {
    public chosen_page: number = 1;
    public readonly max_page: number = 3;

    @ViewChild('finish_reg_btn') private finish_registration_button: any;
    @ViewChild('next_reg_btn') private next_registration_button: any;
    @ViewChild('prev_reg_btn') private prev_registration_button: any;

    public email: string = '';
    public password1: string = '';
    public password2: string = '';
    public name: string = '';
    public city: string = '';
    public education: string = '';
    public experience: string = '';
    public salary: string = '';
    public specialization: string = '';

    constructor(
        public router: RoutingService,
        private localstorage: LocalstorageService,
        private user_service: UserService,
    ) {
    }

    ngAfterViewInit() {
    }

    register() {
        if (this.salary === '' || ['нет','среднее','высшее'].indexOf(this.education) == -1 || this.experience === '') {
            this.highlightRed(this.finish_registration_button.nativeElement);
            return;
        }
        let data: UserRegisterModel = {
            email: this.email,
            city: this.city,
            name: this.name,
            education: String(['нет','среднее','высшее'].indexOf(this.education)),
            experience: this.experience,
            password: this.password1,
            salary: Number(this.salary),
            specialization: this.specialization,
        }
        this.user_service.register(data).subscribe(
            resp => {
                this.user_service.login({email: this.email, password: this.password1}).subscribe(
                    response => {
                        this.localstorage.set('user', response.access);
                        this.router.navigate('');
                    }
                )
            }
        )
    }

    highlightRed(el: any) {
        el.style.background = 'var(--red)';
        setTimeout(() => {
            el.style.background = '';
        }, 300);
    }

    choosePage(page: number) {
        let highlight = () => {
            if (page === this.max_page) this.highlightRed(this.finish_registration_button.nativeElement);
            else if (page < this.chosen_page) this.highlightRed(this.prev_registration_button.nativeElement);
            else this.highlightRed(this.next_registration_button.nativeElement);
        };
        if (page > this.chosen_page) {
            if (this.chosen_page === 1 && (this.password2 !== this.password1 || this.password1.length < 8 || this.email === '')) {
                highlight();
                return;
            } else if (this.chosen_page === 2 && (this.name === '' || this.city === '' || this.specialization === '')) {
                highlight();
                return;
            }
        }

        if (page <= 0 || page > this.max_page) {
            highlight();
            return;
        }
        this.chosen_page = page;

        const card = document.getElementById('form-card' + page)!;
        const roller = document.getElementById('form-roller')!;

        roller.scrollTo({
            left: card.offsetLeft,
            behavior: "smooth",
        });
    }

}
