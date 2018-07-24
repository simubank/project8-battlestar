import { Injectable } from '@angular/core';
 
@Injectable()
export class ShareService {
     
    totPoints: number;
 
    constructor() {
        this.totPoints = 2;
    }
  
    setPoints(points) {
        this.totPoints = points;
    }
    getPoints() {
        return this.totPoints;
    }

}