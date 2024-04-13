import {AfterViewInit, Component, ViewChildren} from '@angular/core';
import {RoutingService} from "../../services/routing.service";
import {NgForOf} from "@angular/common";
import {SlideMenuComponent} from "../_models/slide-menu/slide-menu.component";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements AfterViewInit{
  @ViewChildren('close_line') public close_lines: any;
  private interacting: boolean = false;

  constructor(
    public router: RoutingService,
  ) {
  }

  ngAfterViewInit() {
    this.close_lines = this.close_lines._results;
    for (let i = 0; i < this.close_lines.length; i++) this.close_lines[i] = this.close_lines[i].nativeElement;
  }

  InteractSlideMenu() {
    if (this.interacting) return;
    this.interacting = true;
    if (SlideMenuComponent.IsOpened()) this.CloseSlideMenu();
    else this.OpenSlideMenu()
  }

  OpenSlideMenu() {
    for (const line of this.close_lines) line.style.width = '0';
    SlideMenuComponent.Open();
    setTimeout(()=>{this.interacting=false;}, SlideMenuComponent.OpenTime);
  }

  CloseSlideMenu() {
    for (const line of this.close_lines) line.style.width = '40px';
    SlideMenuComponent.Close();
    setTimeout(()=>{this.interacting=false;}, SlideMenuComponent.CloseTime);
  }

}
