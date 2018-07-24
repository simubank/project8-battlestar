import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ShareService } from '../../providers/share/share';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  runningTot = 3;
  constructor(shareService: ShareService, platform: Platform) {
    platform.ready().then(() => {
      console.log(this.runningTot);
      this.runningTot = shareService.getPoints();
    });

  };

}


