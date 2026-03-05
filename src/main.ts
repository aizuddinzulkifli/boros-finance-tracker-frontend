import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/core/auth-interceptor';
 
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
    
}).catch(err => console.error(err));

//import { appConfig } from './app/app.config';
//import { AppModule } from './app/app-module';

//bootstrapApplication(App, appConfig).catch((err) => console.error(err));

  // platformBrowserDynamic().bootstrapModule(AppModule)
  // .catch(err => console.error(err));

  //bootstrapApplication(AppComponent);
