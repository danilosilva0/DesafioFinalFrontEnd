import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { NgIf } from '@angular/common';
import { CadastrarPacienteService } from '../../services/cadastro/cadastro-paciente.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PacienteModel } from '../../model/paciente.model';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [MatSnackBarModule, ReactiveFormsModule, InputValidationComponent, NgIf],
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private cadastrarPacienteService: CadastrarPacienteService,
    private notificationService: NotificationService) {
    this.pacienteForm = this.fb.group({
      nome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(65)],
      dataNascimento: ['', Validators.required],
      diaAgendamento: ['', Validators.required],
      horaAgendamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.pacienteForm.valid) {
      const pacienteValues = this.pacienteForm.value as PacienteModel;
      this.cadastrarPacienteService.cadastrarPaciente(pacienteValues).subscribe(() => {
        this.notificationService.showSuccess(
          `Paciente ${this.pacienteForm.value.nome} cadastrado com sucesso`
        );
      });
      this.notificationService.showSuccess('Agendamento criado com sucesso!');
      this.pacienteForm.reset();
    } else {
      this.notificationService.showWarning('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
