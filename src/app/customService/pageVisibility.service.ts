import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})


export class PageVisibilityService {
    private isPageVisibleSubject = new Subject<boolean>();
    isPageVisible$ = this.isPageVisibleSubject.asObservable();
  
    constructor() {
      this.setupPageVisibilityListener();
    }
  
    private setupPageVisibilityListener() {
      document.addEventListener('visibilitychange', () => {
        this.isPageVisibleSubject.next(!document.hidden);
      });
    }
  
    checkPageVisibility() {
      return !document.hidden;
    }
  }