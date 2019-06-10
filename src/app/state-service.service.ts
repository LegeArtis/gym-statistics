import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {

  private readonly isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth > 768;
  }

  public getIsMobile (): boolean {
    return this.isMobile;
  }
}
