import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// ✅ Swiper como custom element
import { register } from 'swiper/element/bundle';
register(); // 👈 Esta línea es la clave

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
