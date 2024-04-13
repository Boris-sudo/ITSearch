import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        FormsModule
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent implements AfterViewInit {
    public chosen_page: number = 1;
    public readonly max_page: number = 5;

    @ViewChild('finish_reg_btn') private finish_registration_button: any;
    @ViewChild('next_reg_btn') private next_registration_button: any;
    @ViewChild('prev_reg_btn') private prev_registration_button: any;

    public email: string = '';
    public password1: string = '';
    public password2: string = '';
    public name: string = '';
    public age: string = '';

    constructor(
        public router: RoutingService
    ) {
    }

    ngAfterViewInit() {
    }

    register() {
        // TODO
    }

    highlightRed(el: any) {
        el.style.background = 'var(--red)';
        setTimeout(()=>{
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
                highlight(); return;
            } else if (this.chosen_page === 2 && (this.name === '' || this.age === '')) {
                highlight(); return;
            } else if (this.chosen_page === 3 && (false)) {
                highlight(); return;
            }
        }
        console.log(1);

        if (page <= 0 || page > this.max_page) {
            highlight(); return;
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
