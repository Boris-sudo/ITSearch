import { Component } from '@angular/core';
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
export class SavedComponent {
    public internships: InternshipModel[] = [];

    constructor(
        private internship_service: InternshipsService,
    ) {
        this.internship_service.get_liked().subscribe(
            resp => {
                this.internships = resp.internships;
            }
        )
    }
}
