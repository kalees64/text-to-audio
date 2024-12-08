import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-text-to-audio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './text-to-audio.component.html',
  styleUrl: './text-to-audio.component.css',
})
export class TextToAudioComponent {
  text: string = '';
  audioUrl: string | null = null;
  loading: boolean = false;
  lang: string = 'en-us';
  voice: string = '';

  constructor(private http: HttpClient) {}

  convertTextToAudio(): void {
    this.startLoading();
    if (!this.text.trim()) {
      alert('Please enter some text.');
      this.stopLoading();
      return;
    }

    const apiKey = '5590727e0cea4fada5bebc075deedb71'; // Replace with your API key
    const url = `https://api.voicerss.org/?key=${apiKey}&hl=${this.lang}&v=${
      this.voice
    }&src=${encodeURIComponent(this.text)}&f=48khz_16bit_stereo`;

    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      this.audioUrl = URL.createObjectURL(blob);

      Swal.fire({
        title: 'Text Coverted to MP3',
        text: 'Do you want to download the mp3 file?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, download it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.downloadAudio();
        }
      });
    });

    this.stopLoading();
  }

  downloadAudio(): void {
    if (this.audioUrl) {
      const link = document.createElement('a');
      link.href = this.audioUrl;
      link.download = 'text-to-audio.mp3';
      link.click();
    }
  }

  startLoading() {
    this.loading = true;
  }
  stopLoading() {
    this.loading = false;
  }
}
