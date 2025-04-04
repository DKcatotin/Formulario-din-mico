// app.routes.ts
import { Route } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { EditarPreguntaComponent } from './components/editar-pregunta/editar-pregunta.component';

// Asegúrate de exportar 'appRoutes' (no 'route')
export const appRoutes: Route[] = [
  { path: '', component: DynamicFormComponent },
  { path: 'editar-pregunta/:id', component: EditarPreguntaComponent }
];
