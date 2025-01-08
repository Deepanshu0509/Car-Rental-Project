import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


const USER = 'user';
const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    }
  }

  saveUser(user: any): void {
    if (this.isBrowser()) {
      localStorage.removeItem(USER);
      localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  isAdminLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === 'ADMIN';
  }

  isCustomerLoggedIn(): boolean {
    return this.getToken() !== null && this.getUserRole() === 'CUSTOMER';
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(USER);
      localStorage.removeItem(TOKEN);
    }
  }
}
