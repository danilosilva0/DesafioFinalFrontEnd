import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AgendamentoModel } from '../../model/agendamento.model';
import { AgendamentoService } from '../../services/cadastro/cadastro-agendamento.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-agendamentos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listar-agendamentos.component.html',
  styleUrl: './listar-agendamentos.component.css'
})
export class ListarAgendamentosComponent {
  private agendamentosSubject = new BehaviorSubject<AgendamentoModel[]>([]);
  agendamentos$: Observable<MatTableDataSource<AgendamentoModel>>;
  dataSource: MatTableDataSource<AgendamentoModel> = new MatTableDataSource<AgendamentoModel>();
  displayedColumns: string[] = ['pacienteNome', 'dataHora', 'status'];

  constructor(private agendamentoService: AgendamentoService) {
    this.agendamentos$ = this.agendamentoService.listarAgendamentos().pipe(
      map(agendamentos => new MatTableDataSource(agendamentos ?? []))
    );

    this.agendamentos$.subscribe(dataSource => {
      this.dataSource = dataSource;
    });
  }
}
