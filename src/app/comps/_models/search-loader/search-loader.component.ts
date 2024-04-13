import {Component} from '@angular/core';

@Component({
  selector: 'app-search-loader',
  standalone: true,
  imports: [],
  templateUrl: './search-loader.component.html',
  styleUrl: './search-loader.component.css'
})
export class SearchLoaderComponent {

  static Show() {
    document.getElementById('search-loader')!.style.display = 'flex';
  }

  static Hide() {
    document.getElementById('search-loader')!.style.display = 'none';
  }
}
