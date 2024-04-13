import {Component, Input} from '@angular/core';
import {InternshipModel} from "../../../models/internship.model";

@Component({
  selector: 'app-internship-card',
  standalone: true,
  imports: [],
  templateUrl: './internship-card.component.html',
  styleUrl: './internship-card.component.css'
})
export class InternshipCardComponent {
  @Input() public internship?: InternshipModel;

}
