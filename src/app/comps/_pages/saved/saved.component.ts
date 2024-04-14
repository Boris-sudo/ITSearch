import {Component, OnInit} from '@angular/core';
import {FilterMenuComponent} from "../../_models/filter-menu/filter-menu.component";
import {FormsModule} from "@angular/forms";
import {InternshipCardComponent} from "../../_models/internship-card/internship-card.component";
import {NgForOf} from "@angular/common";
import {SearchLoaderComponent} from "../../_models/search-loader/search-loader.component";
import {InternshipModel} from "../../../models/internship.model";
import {InternshipsService} from "../../../services/api/internships.service";

@Component({
  selector: 'app-saved',
  standalone: true,
    imports: [
        FilterMenuComponent,
        FormsModule,
        InternshipCardComponent,
        NgForOf,
        SearchLoaderComponent
    ],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent implements OnInit {
    public internships: InternshipModel[] = [];

    constructor(
        private internship_service: InternshipsService,
    ) {
    }

    ngOnInit() {
        this.internship_service.get_liked().subscribe(
            resp => {
                console.log(resp);
                this.internships = resp;
                console.log(this.internships);
            }
        )
    }
}
