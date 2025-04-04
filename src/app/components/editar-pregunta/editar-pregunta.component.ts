import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreguntaService } from '../../services/pregunta.service'; // ajusta la ruta
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-pregunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>✏️ Editar Pregunta</h2>
      <form [formGroup]="form" (ngSubmit)="guardarCambios()">
        <input type="text" formControlName="label" class="input-field" placeholder="Pregunta" />

        <select formControlName="type" class="input-field">
          <option value="text">Texto</option>
          <option value="number">Número</option>
          <option value="date">Fecha</option>
          <option value="select">Selección</option>
        </select>

        <input *ngIf="form.value.type !== 'select'" [type]="form.value.type" formControlName="value" class="input-field" placeholder="Respuesta" />

        <div *ngIf="options && form.value.type === 'select'" [formGroup]="options">
          <input formControlName="option1" class="input-field" placeholder="Opción 1">
          <input formControlName="option2" class="input-field" placeholder="Opción 2">
        </div>

        <button type="submit" class="submit-btn"> Guardar Cambios</button>
      </form>
    </div>
  `
})
export class EditarPreguntaComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const pregunta = this.preguntaService.getPreguntaValorActual();
  
    if (!pregunta) {
      console.warn('No se encontró la pregunta para editar');
      return;
    }
  
    this.form = this.fb.group({
      id: [pregunta.id],
      label: [pregunta.label],
      type: [pregunta.type],
      value: [pregunta.value],
      options: this.fb.group({
        option1: [pregunta.options?.option1 || ''],
        option2: [pregunta.options?.option2 || '']
      })
    });
  }

  get options() {
    return this.form.get('options') as FormGroup;
  }

  guardarCambios() {
    console.log('Pregunta actualizada:', this.form.value);
    // Puedes agregar navegación de regreso, o actualización global aquí
  }
}
