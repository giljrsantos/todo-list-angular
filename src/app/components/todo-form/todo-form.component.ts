import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoSignalsService } from '@app/services/todo-signals.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: []
})
export class TodoFormComponent {

  private todoSignalsService = inject(TodoSignalsService);
  private dialogService = inject(MatDialogRef<HeaderComponent>)
  public allTodos = this.todoSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  public hanleCreateNewTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);

      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todoSignalsService.updateTodos({ id, title, description, done });

      this.dialogService.close()
    }
  }

  public handleCloseModal(): void {
    this.dialogService.close();
  }
}
