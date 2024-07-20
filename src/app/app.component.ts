import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { CadastroAgendamentoComponent } from './pages/cadastro-agendamento/cadastro-agendamento.component';
import { ListarPacientesComponent } from './pages/listar-pacientes/listar-pacientes.component';
import { ListarAgendamentosComponent } from './pages/listar-agendamentos/listar-agendamentos.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, InputValidationComponent, MatIconModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-final-front';
}

