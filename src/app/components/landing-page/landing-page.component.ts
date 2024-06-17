import { Component, HostListener, OnInit } from '@angular/core';
import {
  fade,
  fall,
  slide,
  triggeredFall,
} from 'src/app/animations/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [fall, fade, triggeredFall, slide],
})
export class LandingPageComponent implements OnInit {
  constructor() {}
  statScroll: boolean = false;
  statScroll1: boolean = false;
  statScroll2: boolean = false;
  statScroll3: boolean = false;
  @HostListener('window:scroll', ['$event']) scrollPosition() {
    window.scrollY >= 600 && window.scrollY <= 700
      ? (this.statScroll = true)
      : (this.statScroll = false);
    window.scrollY <= 1000 && window.scrollY >= 880
      ? (this.statScroll1 = true)
      : null;
    window.scrollY <= 1300 && window.scrollY >= 1250
      ? (this.statScroll2 = true)
      : null;
    window.scrollY >= 1430 && window.scrollY <= 1445
      ? (this.statScroll3 = true)
      : null;
  }

  ngOnInit(): void {}
}
