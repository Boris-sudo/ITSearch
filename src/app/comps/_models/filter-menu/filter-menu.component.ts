import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InternshipsService} from "../../../services/api/internships.service";

@Component({
    selector: 'app-filter-menu',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './filter-menu.component.html',
    styleUrls: ['../styles/input-design.css', './filter-menu.component.css']
})
export class FilterMenuComponent {
    public readonly PrivateContainerId: string = FilterMenuComponent.ContainerId;
    static readonly ContainerId: string = 'filter-menu-container';

    public city: string = '';
    public education: string = '';
    public graphic: number = 0;
    public experience: string = '';
    public salary: string = '';

    constructor(
        private internship_service: InternshipsService,
    ) {
    }

    static IsShown() {
        const container = document.getElementById(this.ContainerId)!;
        return container.style.transform === 'translateX(0px)';
    }

    static Show() {
        const container = document.getElementById(this.ContainerId)!;
        container.style.transform = 'translateX(0px)';
    }

    static Hide() {
        const container = document.getElementById(this.ContainerId)!;
        container.style.transform = 'translateX(100%)';
    }

    choose() {
        this.internship_service.emit_data({
            city: this.city,
            education: this.education,
            salary: this.salary,
            experience: this.experience,
            schedule: String(this.graphic),
            duration: ''
        });
        FilterMenuComponent.Hide();
    }
}
