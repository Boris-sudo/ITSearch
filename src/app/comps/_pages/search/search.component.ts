import {AfterViewInit, Component, ViewChildren} from '@angular/core';
import {NgForOf} from "@angular/common";
import {InternshipModel, Internships} from "../../../models/internship.model";
import {InternshipCardComponent} from "../../_models/internship-card/internship-card.component";
import {SearchLoaderComponent} from "../../_models/search-loader/search-loader.component";

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        NgForOf,
        InternshipCardComponent,
        SearchLoaderComponent
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit {
    @ViewChildren('internship') public internship_cards: any;
    public internships: InternshipModel[] = Internships;
    private adding_new_internships: boolean = false;

    constructor() {
    }

    ngAfterViewInit() {
        this.internship_cards = this.internship_cards._results;
        const scroll = document.getElementById('main-scroll')!;

        scroll.addEventListener('scroll', () => {
            this.ScrollListener();
        })
        this.AddInternships();
    }

    AddInternships() {
        if (this.adding_new_internships) return;
        this.adding_new_internships = true;
        SearchLoaderComponent.Show();
        // TODO get from api
    }

    ScrollListener() {
        const last_internship = this.internship_cards[this.internship_cards.length - 1].nativeElement;

        let onIntersection = (entries: any, opt: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    this.AddInternships();
                }
            })
        }

        var observer = new IntersectionObserver(onIntersection, {
            root: null,
            threshold: .5
        })

        observer.observe(last_internship);
    }
}
