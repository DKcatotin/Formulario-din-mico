import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private preguntaSeleccionada = new BehaviorSubject<any>(null);

  setPregunta(pregunta: any) {
    this.preguntaSeleccionada.next(pregunta);
  }

  getPregunta() {
    return this.preguntaSeleccionada.asObservable();
  }

  getPreguntaValorActual() {
    return this.preguntaSeleccionada.value;
  }
}
