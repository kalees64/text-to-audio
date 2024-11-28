import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkThemeClass = 'dark';

  toggleTheme(): void {
    const body = document.body;
    if (body.classList.contains(this.darkThemeClass)) {
      body.classList.remove(this.darkThemeClass);
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add(this.darkThemeClass);
      localStorage.setItem('theme', 'dark');
    }
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
    } else {
      document.body.classList.remove(this.darkThemeClass);
    }
  }
}