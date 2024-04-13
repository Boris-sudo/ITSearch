import {AfterViewInit, Component} from '@angular/core';
import {RoutingService} from "../../../services/routing.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-slide-menu',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './slide-menu.component.html',
    styleUrl: './slide-menu.component.css'
})
export class SlideMenuComponent implements AfterViewInit {
    static readonly CloseTime = 600;
    static readonly OpenTime = 1200;

    constructor(
        public router: RoutingService,
    ) {
    }

    ngAfterViewInit() {
    }

    static IsOpened() {
        const menu = document.getElementById('slide-menu-main')!;
        return menu.style.display === 'flex';
    }

    static Open() {
        const menu = document.getElementById('slide-menu-main')!;
        const links = document.getElementsByClassName('sb-link');

        menu.style.display = 'flex';
        for (let i = 0; i < links.length; i++) { // @ts-ignore
            links[i].style.transitionDelay = `${i * (600 / links.length)}ms`;
        }
        setTimeout(() => {
            menu.classList.add('main-show');

            setTimeout(() => {
                for (let i = 0; i < links.length; i++) { // @ts-ignore
                    links[i].style.opacity = '1';
                }
            }, 600);
        });
    }

    static Close() {
        const menu = document.getElementById('slide-menu-main')!;
        const links = document.getElementsByClassName('sb-link');

        for (let i = 0; i < links.length; i++) { // @ts-ignore
            links[i].style.transitionDelay = `${(links.length - i - 1) * (600 / links.length)}ms`;
        }

        setTimeout(() => {
            for (let i = 0; i < links.length; i++) { // @ts-ignore
                links[i].style.opacity = '0';
            }
            menu.classList.remove('main-show');

            setTimeout(() => {
                menu.style.display = 'none';
            }, 600);
        })
    }
}
