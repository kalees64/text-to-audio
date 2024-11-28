import { Component } from '@angular/core';
import { TextToAudioComponent } from './components/text-to-audio/text-to-audio.component';

import { OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TextToAudioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  title = 'text-to-speech';
}
