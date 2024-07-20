import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { NgIf } from '@angular/common';
import { PacienteService } from '../../services/cadastro/cadastro-paciente.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PacienteModel } from '../../model/paciente.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [
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
export class CadastroPacienteComponent implements OnInit, OnDestroy {
  pacienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar, 
    private cadastrarPacienteService: PacienteService,
    private notificationService: NotificationService, 
    private http: HttpClient,
    private storageService: StorageService
  ) 
    {
    this.pacienteForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      terms: ['', Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();
      this.pacienteForm.valueChanges.subscribe(() => {
        this.saveToLocalStorage();
      });
    } 
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pacienteForm', JSON.stringify(this.pacienteForm.value));
    }
  }

  private loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const dadosSalvos = localStorage.getItem('pacienteForm');
      if (dadosSalvos) {
        this.pacienteForm.setValue(JSON.parse(dadosSalvos));
      }
    }
  }

  private removeFromLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pacienteForm');
    }
  }

  onSubmit() {
    console.log(this.pacienteForm.valid);
    console.log(this.pacienteForm);
    if (this.pacienteForm.valid) {
      const paciente = this.pacienteForm.value as PacienteModel;
      this.cadastrarPacienteService.cadastrarPaciente(paciente).subscribe(() => {
        this.notificationService.showSuccess(`Paciente ${this.pacienteForm.value.nome} cadastrado com sucesso`);
      });
      this.pacienteForm.reset();
      this.removeFromLocalStorage();
    } else {
      this.notificationService.showWarning('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
