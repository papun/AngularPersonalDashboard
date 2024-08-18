import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnim', [
      transition('*=>*', [
        style({ opacity: 0, transform: 'translateX(-90%)' }),
        animate(
          '1s ease-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
    ]),
    trigger('bgAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('1s', style({ opacity: 0 }))]),
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '250ms 1s ease-in',
          style({ opacity: 1, transform: 'translateY(0px)' })
        ),
      ]),
      transition(':leave', [animate('120ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  backgrounds: string[] = [];

  loading: boolean;

  dateTime: Observable<Date>;

  constructor() {
    this.changeBgimg();
  }
  ngOnInit(): void {
    this.dateTime=timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }

  prepareRoute(outlet: RouterOutlet): string | null {
    if (outlet.isActivated) return outlet.activatedRoute.snapshot.url.join('/');
    return null;
  }

  async changeBgimg() {
    this.loading = true;
    const requestUrl =
      'https://api.unsplash.com/photos/?client_id=-ztGseR5vnDCr4eHKlOXxQVMeO-U0OmYrgZAq-B43zY';
    const random = Math.floor(Math.random() * 10);
    const result = await fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        let allImages = data[random];
        return allImages.urls.regular;
      });
    const alreadyGot = this.backgrounds.includes(result);
    if (alreadyGot) {
      this.changeBgimg();
    }
    this.backgrounds.push(result);
  }

  onBgImgload(imgEvent: Event) {
    const imgELement = imgEvent.target as HTMLImageElement;
    const src = imgELement.src;

    this.backgrounds = this.backgrounds.filter((b) => b === src);

    this.loading = false;
  }
}
