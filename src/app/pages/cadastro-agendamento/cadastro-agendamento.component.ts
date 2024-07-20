import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PacienteService } from '../../services/cadastro/cadastro-paciente.service';
import { PacienteModel } from '../../model/paciente.model';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { AgendamentoService } from '../../services/cadastro/cadastro-agendamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification/notification.service';
import { AgendamentoModel } from '../../model/agendamento.model';
import { StorageService } from '../../services/storage/storage.service';

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
  agendamentoForm: FormGroup;
  pacientes$: Observable<PacienteModel[]> = of([]);
  private agendamentosSubject = new BehaviorSubject<AgendamentoModel[]>([]);
  agendamentos$ = this.agendamentosSubject.asObservable();
  private readonly storageKey = 'agendamentos';
  horasDisponiveis: string[] = [];

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private agendamentoService: AgendamentoService,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {
    this.agendamentoForm = this.fb.group({
      pacienteId: [null, Validators.required],
      dataAgendamento: [null, Validators.required],
      horaAgendamento: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.gerarHorasDisponiveis();
    if (typeof window !== 'undefined') {
      this.pacientes$ = this.pacienteService.listarPacientes();
      this.loadFromLocalStorage();
      this.agendamentoForm.valueChanges.subscribe(() => {
        this.saveToLocalStorage();
      });
    }
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      this.saveToLocalStorage();
    }
  }

  private gerarHorasDisponiveis(): void {
    const horas = [];
    for (let i = 8; i <= 18; i += 1) {
      const horaFormatada = `${i.toString().padStart(2, '0')}:00`;
      horas.push(horaFormatada);
    }
    this.horasDisponiveis = horas;
  }

  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const agendamentos = this.agendamentosSubject.value;
    this.storageService.setItem(this.storageKey, agendamentos);
    }
  }

  private loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const agendamentosSalvos = this.storageService.getItem<AgendamentoModel[]>(this.storageKey);
      if (agendamentosSalvos) {
        this.agendamentosSubject.next(agendamentosSalvos);
      }
    }
  }

  private removeFromLocalStorage() {
    if (typeof window !== 'undefined') {
      this.storageService.removeItem(this.storageKey);
    }
  }

  conferirDisponibilidade(agendamento: AgendamentoModel): boolean {
    const data = new Date(agendamento.data);
    const [hora, minuto] = agendamento.hora.split(':').map(Number);
    data.setHours(hora, minuto);

    const agendamentosDoDia = this.agendamentosSubject.value.filter(
      a => new Date(a.data).toDateString() === data.toDateString()
    );

    const agendamentosDoHorario = agendamentosDoDia.filter(
      a => new Date(a.data).getTime() === data.getTime()
    );

    if (agendamentosDoDia.length >= 20) {
      this.notificationService.showWarning('O limite de vagas (20) para este dia já foi excedido.');
      return false;
    }

    if (agendamentosDoHorario.length >= 2) {
      this.notificationService.showWarning('O limite de vagas (2) para este horário já foi excedido.');
      return false;
    }

    if (agendamentosDoDia.some(a => Math.abs(new Date(a.data).getTime() - data.getTime()) < 60 * 60 * 1000)) {
      this.notificationService.showWarning('O intervalo entre agendamentos deve ser de pelo menos 1 hora.');
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (this.agendamentoForm.valid) {
      const agendamento = this.agendamentoForm.value as AgendamentoModel;
      if (this.conferirDisponibilidade(agendamento)) {
        this.agendamentoService.cadastrarAgendamento(agendamento).subscribe(
          response => {
            this.notificationService.showSuccess('Agendamento criado com sucesso!');
            this.agendamentosSubject.next([...this.agendamentosSubject.value, response]);
            this.agendamentoForm.reset();
            this.removeFromLocalStorage();
          },
          error => {
            this.notificationService.showError('Erro ao criar agendamento. Tente novamente.');
          });
      }
    } else {
      this.notificationService.showWarning('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
