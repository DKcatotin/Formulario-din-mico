// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes'; // Asegúrate de importar 'appRoutes'
import { DynamicFormComponent } from './app/dynamic-form/dynamic-form.component';

bootstrapApplication(DynamicFormComponent, {
  providers: [
    provideRouter(appRoutes) // Usa 'appRoutes' en lugar de 'route'
  ]
});
