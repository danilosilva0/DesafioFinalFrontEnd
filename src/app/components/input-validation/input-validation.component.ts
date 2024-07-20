import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-validation',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './input-validation.component.html'
})
export class InputValidationComponent {
  @Input() control!: AbstractControl;

  mostrarErros(): boolean {
    return !!this.control && this.control.touched && this.control.invalid;
  }

  mostrarMensagens(): string[] {
    if (this.control && this.control.errors) {
      const erros: ValidationErrors = this.control.errors;
      return Object.keys(erros).map((key) => this.mensagens(key, erros[key]));
    }
    return [];
  }

  mensagens(errorKey: string, errorValue: any): string {
    const messages: { [key: string]: string } = {
      required: 'O campo é obrigatório',
      minlength: `O campo precisa ter no mínimo ${errorValue.requiredLength} caracteres`,
      maxlength: `O campo pode ter no máximo ${errorValue.requiredLength} caracteres`,
      email: 'O email é inválido',
    };
    return messages[errorKey] || 'Erro desconhecido';
  }
}
