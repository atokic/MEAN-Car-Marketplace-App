import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  onSearchChange(): void {
    this.search.emit(this.searchTerm.trim().toLowerCase());
  }
}
