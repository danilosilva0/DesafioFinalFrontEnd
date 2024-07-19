import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { NgIf } from '@angular/common';
import { CadastrarPacienteService } from '../../services/cadastro/cadastro-paciente.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PacienteModel } from '../../model/paciente.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [
    MatSnackBarModule,
    ReactiveFormsModule,
    InputValidationComponent,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private cadastrarPacienteService: CadastrarPacienteService,
    private notificationService: NotificationService, private http: HttpClient) {
    this.pacienteForm = this.fb.group({
      nome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(65)],
      dataNascimento: ['', Validators.required],
      diaAgendamento: ['', Validators.required],
      horaAgendamento: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  get nomeControl() {
    return this.pacienteForm.get('nome') as AbstractControl;
  }

  get dataNascimentoControl() {
    return this.pacienteForm.get('dataNascimento') as AbstractControl;
  }

  get diaAgendamentoControl() {
    return this.pacienteForm.get('diaAgendamento') as AbstractControl;
  }

  get horaAgendamentoControl() {
    return this.pacienteForm.get('horaAgendamento') as AbstractControl;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.pacienteForm.valid) {
      const pacienteValues = this.pacienteForm.value as PacienteModel;
      // this.cadastrarPacienteService.cadastrarPaciente(pacienteValues).subscribe(() => {
      //   this.notificationService.showSuccess(
      //     `Paciente ${this.pacienteForm.value.nome} cadastrado com sucesso`
      //   );
      // });
      this.notificationService.showSuccess('Agendamento criado com sucesso!');
      this.pacienteForm.reset();
    } else {
      this.notificationService.showWarning('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
