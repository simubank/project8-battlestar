import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ShareService } from '../../providers/share/share';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  runningTot = 3;
  constructor(private shareService: ShareService, platform: Platform) {
    if (this.shareService.getPoints() === 2) {
      this.shareService.setPoints(838);
    };
    console.log(this.shareService.getPoints());
      this.runningTot = this.shareService.getPoints();

  };

}


