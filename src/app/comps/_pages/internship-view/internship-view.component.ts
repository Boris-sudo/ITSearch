import {Component, ViewChild} from '@angular/core';
import {InternshipCardComponent} from "../../_models/internship-card/internship-card.component";
import {InternshipModel} from "../../../models/internship.model";
import {InternshipsService} from "../../../services/api/internships.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";

@Component({
    selector: 'app-internship-view',
    standalone: true,
    imports: [
        InternshipCardComponent,
        FormsModule
    ],
    templateUrl: './internship-view.component.html',
    styleUrl: './internship-view.component.css'
})
export class InternshipViewComponent {
    public readonly years: string[] = ['одного года', 'двух лет', 'трёх лет', 'четырех лет', 'пяти лет', 'шести лет', 'семи лет', 'восьми лет', 'девяти лет', 'десяти лет']
    public internship?: InternshipModel;
    public comment: string = '';
    public rating: number = 0;

    constructor(
        private router: RoutingService,
        private route: ActivatedRoute,
        private internship_service: InternshipsService,
    ) {
        this.getInternship();
    }

    getInternship() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.internship_service.getById(id).subscribe(
            resp => {
                console.log(resp);
                this.internship = resp;
            }
        )
    }

    GetDuration() {
        return (this.internship?.duration === 1? '1 месяц' : this.internship?.duration + 'месяцев');
    }

    GetExperience() {
        return (this.internship?.experience == 0? 'Без опыта' : `Опыт от ${this.years[this.internship?.experience!]}`)
    }

    GetEducation() {
        return (this.internship?.education == 'не требуется'? 'Образование не требуется' : `Требуется ${this.internship?.education} образование`)
    }

    LeaveFeedback() {
        this.internship_service.review({internship_id: this.internship!.id, rating: this.rating}).subscribe(
            ()=>{
                this.router.navigate('');
            }
        )
    }
}
