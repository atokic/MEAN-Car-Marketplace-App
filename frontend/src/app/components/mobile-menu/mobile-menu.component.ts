import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent {
  @Input() isUser = false;
  @Input() isAdmin = false;
  @Input() isAuthenticated = false;
  @Input() username: string | null = null;

  @Output() closeMenu = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  close(): void {
    this.closeMenu.emit();
  }
  
  onLogout(): void {
    this.logout.emit();
    this.close();
  }
}
