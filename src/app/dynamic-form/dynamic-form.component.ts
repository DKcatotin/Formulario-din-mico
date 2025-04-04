import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PreguntaService } from '../services/pregunta.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="form-container">
    <h2>Formulario Dinámico</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div formArrayName="questions">
        <div *ngFor="let question of questions.controls; let i = index" [formGroupName]="i" class="question-card">
          <input type="text" formControlName="label" placeholder="Escribe tu pregunta..." class="input-field" required>
          
          <select formControlName="type" class="input-field select-field">
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="date">Fecha</option>
            <option value="select">Selección</option>
          </select>

          <input *ngIf="question.value.type !== 'select'" 
            [type]="question.value.type" formControlName="value" 
            class="input-field" placeholder="Ingresa la respuesta...">

          <div *ngIf="question.value.type === 'select'" formGroupName="options">
            <input type="text" formControlName="option1" class="input-field" placeholder="Opción 1">
            <input type="text" formControlName="option2" class="input-field" placeholder="Opción 2">
          </div>

          <div class="button-group">
            <button type="button" class="delete-btn" (click)="removeQuestion(i)">Eliminar</button>
            <button type="button" class="edit-btn" (click)="editarPregunta(i)">Modificar</button>
          </div>
        </div>
      </div>

      <div class="button-group">
        <button type="button" class="add-btn" (click)="addQuestion()">Agregar Pregunta</button>
        <button type="submit" class="submit-btn">Enviar</button>
      </div>
    </form>
  </div>
  `,
  styles: [`
    body {
      background-color: #f4f6f9;
      font-family: 'Arial', sans-serif;
    }

    .form-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }

    .question-card {
      background-color: #f9f9f9;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .input-field, .select-field {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
    }

    .input-field:focus, .select-field:focus {
      border-color: #007BFF;
      outline: none;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }

    .add-btn, .submit-btn {
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .add-btn {
      background-color: #28a745;
      color: white;
    }

    .add-btn:hover {
      background-color: #218838;
    }

    .submit-btn {
      background-color: #007BFF;
      color: white;
    }

    .submit-btn:hover {
      background-color: #0056b3;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
      padding: 8px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }

    .delete-btn:hover {
      background-color: #c82333;
    }

    .edit-btn {
      background-color: #ffc107;
      color: white;
      padding: 8px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }

    .edit-btn:hover {
      background-color: #e0a800;
    }
  `]
})
export class DynamicFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private preguntaService: PreguntaService // ✅ inyectamos aquí
  ) {
    this.form = this.fb.group({
      questions: this.fb.array([])  // Contenedor de las preguntas dinámicas
    });
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  addQuestion() {
    const id = crypto.randomUUID(); // Generar ID único
    this.questions.push(this.fb.group({
      id: [id],
      label: ['', Validators.required],
      type: ['text'],
      value: [''],
      options: this.fb.group({
        option1: [''],
        option2: ['']
      })
    }));
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  editarPregunta(index: number) {
    const pregunta = this.questions.at(index).value;
    this.preguntaService.setPregunta(pregunta); // ✅ Guardamos en el servicio
    this.router.navigate(['/editar-pregunta', pregunta.id]);
  }

  submit() {
    console.log(this.form.value);
  }
}
