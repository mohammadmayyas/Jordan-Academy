import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  localLang = localStorage.getItem('currentLang');
  private langSource = new BehaviorSubject(this.localLang);
  currentLang = this.langSource.asObservable();
  refresh = new BehaviorSubject(0);
  constructor() { }

  changeLang(lang: string) {
    this.langSource.next(lang)
    this.refresh.next(new Date().getTime())
  }
}
