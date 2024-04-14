import {Component, OnInit} from '@angular/core';
import {LocalstorageService} from "../../../services/localstorage.service";
import {RoutingService} from "../../../services/routing.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {InternshipCardComponent} from "../../_models/internship-card/internship-card.component";
import {InternshipModel} from "../../../models/internship.model";
import {SearchLoaderComponent} from "../../_models/search-loader/search-loader.component";
import {InternshipsService} from "../../../services/api/internships.service";

@Component({
    selector: 'app-shorts',
    standalone: true,
    imports: [
        NgStyle,
        NgForOf,
        InternshipCardComponent,
        SearchLoaderComponent,
        NgIf
    ],
    templateUrl: './shorts.component.html',
    styleUrl: './shorts.component.css'
})
export class ShortsComponent implements OnInit {
    private readonly deleteTimer: number = 1200;
    public internships: InternshipModel[] = [];
    private touch_x?: number;
    private percent?: number;
    private readonly max_delta = 100;
    private shorts_deleting: boolean = false;

    constructor(
        private internships_service: InternshipsService,
        private localstorage: LocalstorageService,
        private router: RoutingService
    ) {
        window.addEventListener('touchstart', (e) => {
            if (this.internships.length === 0) return;
            const card = document.getElementById('f0')!;
            this.touch_x = e.touches[0].clientX;
            card.style.transitionDuration = '0s';
        });

        window.addEventListener('touchmove', (e) => {
            if (this.internships.length === 0) return;
            const x = e.touches[0].clientX;
            this.percent = Math.min(1, Math.max(-1, (this.touch_x! - x) / this.max_delta));
            const card = document.getElementById('f0')!;
            setTimeout(()=>{card.style.transform = `translateX(calc(-70vw * ${this.percent})) rotate(calc(-30deg * ${this.percent})) scale(calc(1 - 0.1 * ${Math.abs(this.percent!)}))`;})
        });

        window.addEventListener('touchend', (e) => {
            if (this.internships.length === 0) return;
            const card = document.getElementById('f0')!;

            card.style.transitionDuration = 'var(--slow-transition-time)';

            if (this.percent! > 0.5) this.moveLeft(true);
            else if (this.percent! < -0.5) this.moveRight(true);
            else {
                setTimeout(() => {
                    card.style.transform = `translateX(0) translateY(0) rotate(0) scale(1)`
                })
            }
            this.touch_x = undefined;
            this.percent = undefined;
        });
    }

    ngOnInit() {
        if (this.localstorage.get('user') === '') this.router.navigate('login');
        this.LoadMoreInternships();
    }

    moveLeft(mobile?: boolean) {
        if (this.internships.length === 0 || this.shorts_deleting) return;
        this.shorts_deleting = true;
        const card = document.getElementById('f0')!;
        const button = document.getElementById('left-button')!;

        if (!mobile) card.style.transform = 'translateX(-70vw) translateY(80vh) rotate(-30deg) scale(0.9)';
        else card.style.transform = 'translateX(-70vw) translateY(20vh) rotate(-30deg) scale(0.9)';
        card.style.opacity = '0';
        button.style.backgroundColor = 'var(--blue)';

        setTimeout(() => {
            card.style.display = 'none';
            button.style.backgroundColor = '';
            this.deleteFirstInternship();
        }, 600);

        setTimeout(()=>{
            this.shorts_deleting = false;
        }, this.deleteTimer)
    }

    deleteFirstInternship() {
        this.internships = this.internships.splice(1, this.internships.length);
        this.LoadMoreInternships();
    }

    saveFirstInternship() {
        this.internships_service.save(this.internships[0].id).subscribe(
            resp => {  },
        )
    }

    moveRight(mobile: boolean = false) {
        if (this.internships.length === 0 || this.shorts_deleting) return;
        this.shorts_deleting = true;
        const card = document.getElementById('f0')!;
        const button = document.getElementById('right-button')!;

        if (!mobile) card.style.transform = 'translateX(70vw) translateY(80vh) rotate(30deg) scale(0.9)';
        else card.style.transform = 'translateX(70vw) translateY(20vh) rotate(30deg) scale(0.9)';
        card.style.opacity = '0';
        button.style.backgroundColor = 'var(--blue)';

        this.saveFirstInternship();

        setTimeout(() => {
            card.style.display = 'none';
            button.style.backgroundColor = '';
            this.deleteFirstInternship();
        }, 600);

        setTimeout(()=>{
            this.shorts_deleting = false;
        }, this.deleteTimer)
    }

    LoadMoreInternships() {
        if (this.internships.length > 2) return;
        this.internships_service.get_shorts().subscribe(
            resp => {
                for (const e of resp) this.internships.push(e);
            }, error => { this.router.navigate('login'); }
        )
    }
}
