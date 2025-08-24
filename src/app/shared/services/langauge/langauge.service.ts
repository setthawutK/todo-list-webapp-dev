import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangaugeService {
  private readonly _translateService: TranslateService = inject(TranslateService);

  constructor() {}

  updateLanguage(lang: string) {
    this.language = lang;
    this._translateService.use(lang);
  }

  get language(): string {
    return localStorage.getItem('language') || 'th';
  }

  set language(lang: string) {
    localStorage.setItem('language', lang);
  }
}
