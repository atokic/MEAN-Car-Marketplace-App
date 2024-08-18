import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  isUser = false;
  username: string | null = null;
  isMobileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(auth => {
      this.isAuthenticated = auth;
      if (auth) {
        this.authService.getUsername().subscribe(username => {
          this.username = username;
        });
        this.authService.getUserRole().subscribe(role => {
          this.isAdmin = role === 'admin';
          this.isUser = role === 'user';
        });
      } else {
        this.isAdmin = false;
        this.isUser = false;
        this.username = null;
      }
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
