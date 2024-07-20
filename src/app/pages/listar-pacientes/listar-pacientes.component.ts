import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteModel } from '../../model/paciente.model';
import { PacienteService } from '../../services/cadastro/cadastro-paciente.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent {
  private pacientesSubject = new BehaviorSubject<PacienteModel[]>([]);
  pacientes$: Observable<MatTableDataSource<PacienteModel>>;
  dataSource: MatTableDataSource<PacienteModel> = new MatTableDataSource<PacienteModel>();
  displayedColumns: string[] = ['nome', 'dataNascimento', 'actions'];

  constructor(private pacienteService: PacienteService, private dialog: MatDialog) {
    this.pacientes$ = this.pacienteService.listarPacientes().pipe(
      map(pacientes => new MatTableDataSource(pacientes ?? []))
    );
    this.pacientes$.subscribe(dataSource => {
      this.dataSource = dataSource;
    });
  }

  visualizar(paciente: PacienteModel): void {
  }

  editar(paciente: PacienteModel): void {
  }

  excluir(paciente: PacienteModel): void {
  }
}
