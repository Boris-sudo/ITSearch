import {Component, OnInit} from '@angular/core';
import {LocalstorageService} from "../../../services/localstorage.service";
import {RoutingService} from "../../../services/routing.service";

@Component({
    selector: 'app-shorts',
    standalone: true,
    imports: [],
    templateUrl: './shorts.component.html',
    styleUrl: './shorts.component.css'
})
export class ShortsComponent implements OnInit {

    constructor(
        private localstorage: LocalstorageService,
        private router: RoutingService
    ) {
    }

    ngOnInit() {
        if (this.localstorage.get('user') === '') this.router.navigate('login');
    }
}
