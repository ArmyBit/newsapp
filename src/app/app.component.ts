import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

import { NewsapidotnetService } from './newsapidotnet.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DataViewModule,
    DatePipe,
    ButtonModule,
    TagModule,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NewsapidotnetService],
})
export class AppComponent implements OnInit {
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png';
  }
  title = 'News ';
  newsarray: any[] | undefined;

  constructor(private newsApi: NewsapidotnetService) {}

  ngOnInit(): void {
    this.newsApi.getNews().subscribe(
      (data: any) => {
        this.newsarray = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching news:', error);
      }
    );
  }
  openUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.warn('No URL provided');
    }
  }
}
