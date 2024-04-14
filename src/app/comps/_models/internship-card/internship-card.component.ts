import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {InternshipModel} from "../../../models/internship.model";

@Component({
  selector: 'app-internship-card',
  standalone: true,
  imports: [],
  templateUrl: './internship-card.component.html',
  styleUrl: './internship-card.component.css'
})
export class InternshipCardComponent {
  public readonly years: string[] = ['одного года', 'двух лет', 'трёх лет', 'четырех лет', 'пяти лет', 'шести лет', 'семи лет', 'восьми лет', 'девяти лет', 'десяти лет']
  @Input() public internship?: InternshipModel;

  GetDuration() {
    return (this.internship?.duration === 1? '1 месяц' : this.internship?.duration + 'месяцев');
  }

  GetExperience() {
    return (this.internship?.experience == 0? 'Без опыта' : `Опыт от ${this.years[this.internship?.experience!]}`)
  }

  GetEducation() {
    return (this.internship?.education == 'не требуется'? 'Образование не требуется' : `Требуется ${this.internship?.education} образование`)
  }
}
