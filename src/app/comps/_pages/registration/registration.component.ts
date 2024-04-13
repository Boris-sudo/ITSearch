import {Component} from '@angular/core';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent {
    public choosen_page: number = 1;

    highlightRed(el: HTMLElement) {
        el.style.background = 'rgb(var(--red))';
        setTimeout(()=>{
            el.style.background = 'rgb(var(--yellow))';
        }, 300);
    }

    choosePage(page: number) {
        let highlight = () => {
            if (page < this.choosen_page) this.highlightRed(document.getElementById('prev-make-meeting-btn')!);
            else this.highlightRed(document.getElementById('next-make-meeting-btn')!);
        };
        if (page > this.choosen_page) {
            if (this.choosen_page === 1) {
                highlight(); return;
            } else if (this.choosen_page === 2) {
                highlight(); return;
            } else if (this.choosen_page === 3) {
                highlight(); return;
            }
        }

        if (page <= 0 || page > 5) {
            highlight(); return;
        }
        this.choosen_page = page;

        const card = document.getElementById('form-card' + page)!;
        const roller = document.getElementById('form-roller')!;

        roller.scrollTo({
            left: card.offsetLeft,
            behavior: "smooth",
        });
    }

}
