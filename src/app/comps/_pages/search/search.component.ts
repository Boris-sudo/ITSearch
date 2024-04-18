import {AfterViewInit, Component, ViewChildren} from '@angular/core';
import {NgForOf} from "@angular/common";
import {InternshipModel, Internships} from "../../../models/internship.model";
import {InternshipCardComponent} from "../../_models/internship-card/internship-card.component";
import {SearchLoaderComponent} from "../../_models/search-loader/search-loader.component";
import {FormsModule} from "@angular/forms";
import {FilterMenuComponent} from "../../_models/filter-menu/filter-menu.component";
import {InternshipsService} from "../../../services/api/internships.service";
import {RoutingService} from "../../../services/routing.service";

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        NgForOf,
        InternshipCardComponent,
        SearchLoaderComponent,
        FormsModule,
        FilterMenuComponent
    ],
    templateUrl: './search.component.html',
    styleUrls: ['../../_models/styles/input-design.css', './search.component.css']
})
export class SearchComponent implements AfterViewInit {
    @ViewChildren('internship') public internship_cards: any;
    public internships: InternshipModel[] = Internships;
    private adding_new_internships: boolean = false;

    public search_name: string = '';
    public last_search: string = '';

    public sorting: boolean = false;

    constructor(
        public router: RoutingService,
        private internship_service: InternshipsService,
    ) {
    }

    ngAfterViewInit() {
        const scroll = document.getElementById('main-scroll')!;

        scroll.addEventListener('scroll', () => {
            this.ScrollListener();
        })
        this.AddInternships();

        this.internship_service.subscribers$.subscribe(
            (data) => {
                this.internships = [];
                SearchLoaderComponent.Show();
                // @ts-ignore
                this.internship_service.filter(data).subscribe(
                    resp => {
                        console.log(resp);
                        this.internships = resp;
                    }
                )
            }
        )
    }

    Sort() {
        if (this.sorting)
            this.internships.sort(function(a,b) { return a.rating > b.rating? 1:-1; })
        else
            this.internships.sort(function(a,b) { return a.rating<b.rating? 1:-1;});
        this.sorting = !this.sorting;
    }

    ScrollToTop() {
        const scroller = document.getElementById('main-scroll')!;
        scroller.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    AddInternships() {
        if (this.adding_new_internships) return;
        this.adding_new_internships = true;
        SearchLoaderComponent.Show();

        this.internship_service.filter({
            duration: '',
            schedule: '',
            experience: '',
            salary: '',
            city: '',
            education: ''
        }).subscribe(
            resp => {
                console.log(resp);
                for (const e of resp) this.internships.push(e);
                SearchLoaderComponent.Hide();
                this.adding_new_internships = false;
            }
        )
    }

    ScrollListener() {
        const last_internship = this.internship_cards.last.nativeElement;

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

    InteractWithFilterMenu() {
        if (FilterMenuComponent.IsShown()) FilterMenuComponent.Hide();
        else FilterMenuComponent.Show();
    }

    FilterWithKeyWords() {
        this.internships = [];
        SearchLoaderComponent.Show();
        this.internship_service.filter({search: this.search_name, city:'', education:'', salary:'', experience:'', schedule:'', duration: ''}).subscribe(
            resp => {
                console.log(resp);
                for (const e of resp) this.internships.push(e);
                SearchLoaderComponent.Hide();
            }
        )
    }
}
