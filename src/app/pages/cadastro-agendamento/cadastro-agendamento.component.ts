import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CadastrarPacienteService } from '../../services/cadastro/cadastro-paciente.service'; // Ajuste o caminho conforme necessário
import { PacienteModel } from '../../model/paciente.model'; // Ajuste o caminho conforme necessário
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';

@Component({
  selector: 'app-cadastro-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputValidationComponent
  ],
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css']
})
export class CadastroAgendamentoComponent implements OnInit {
  agendamentoForm!: FormGroup; // Asserção não nula
  pacientes$: Observable<PacienteModel[]> = of([]); // Observable para lista de pacientes

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private pacienteService: CadastrarPacienteService
  ) {}

  ngOnInit(): void {
    this.initForm();
    // this.pacientes$ = this.pacienteService.listarPacientes();
  }

  private initForm(): void {
    this.agendamentoForm = this.fb.group({
      pacienteId: [null, Validators.required],
      dataAgendamento: [null, Validators.required],
      horaAgendamento: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.agendamentoForm.valid) {
      const agendamentoData = this.agendamentoForm.value;
      this.http.post('/api/Desafio/InserirAgendamento', agendamentoData).subscribe(
        response => {
          console.log('Agendamento realizado com sucesso', response);
        },
        error => {
          console.error('Erro ao realizar o agendamento', error);
        }
      );
    }
  }
}
