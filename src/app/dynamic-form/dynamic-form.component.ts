import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>📋 Formulario Dinámico</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div formArrayName="questions">
          <div *ngFor="let question of questions.controls; let i = index" [formGroupName]="i" class="question-card">
            <input type="text" formControlName="label" placeholder="Escribe tu pregunta..." class="input-field" required>
            
            <select formControlName="type" class="select-field">
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

            <button type="button" class="delete-btn" (click)="removeQuestion(i)"> 🚫Eliminar</button>
          </div>
        </div>

        <button type="button" class="add-btn" (click)="addQuestion()">➕ Agregar Pregunta</button>
        <button type="submit" class="submit-btn">✅ Enviar</button>
      </form>
    </div>
  `,
  styles: [`
    body {
      background: linear-gradient(to right, #4facfe, #00f2fe);
      font-family: Arial, sans-serif;
    }
    
    .container {
      max-width: 500px;
      margin: 30px auto;
      padding: 20px;
      background: white;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }

    h2 {
      text-align: center;
      color: #333;
    }

    .question-card {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
    }

    .input-field, .select-field {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .add-btn, .submit-btn {
      display: block;
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .add-btn {
      background: #4caf50;
      color: white;
    }

    .add-btn:hover {
      background: #45a049;
    }

    .submit-btn {
      background: #2196f3;
      color: white;
    }

    .submit-btn:hover {
      background: #1e88e5;
    }

    .delete-btn {
      display: block;
      width: 100%;
      background: #e74c3c;
      color: white;
      padding: 5px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 10px;
    }

    .delete-btn:hover {
      background: #c0392b;
    }
  `]
})
export class DynamicFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.fb.group({
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

  submit() {
    console.log(this.form.value);
  }
}
