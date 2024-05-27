import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

const enhancedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient(withFetch()),
    provideAnimations()
  ]
};

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));
