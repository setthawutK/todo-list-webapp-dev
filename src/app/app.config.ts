import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceAuthInterceptor } from '@shared/network/interceptor/interceptor-service/interceptor-service.auth.interceptor';
import { providePrimeNG } from 'primeng/config';
import { TodoListPreset } from 'src/assets/theme/todolist-theme';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

const interceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServiceAuthInterceptor,
  multi: true,
};

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const provideTranslation = () => ({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    DialogService,
    MessageService,
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([TranslateModule.forRoot(provideTranslation())]),
    interceptorProvider,
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: TodoListPreset,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};
