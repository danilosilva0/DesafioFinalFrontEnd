import { Routes } from '@angular/router';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { CadastroAgendamentoComponent } from './pages/cadastro-agendamento/cadastro-agendamento.component';
import { ListarPacientesComponent } from './pages/listar-pacientes/listar-pacientes.component';
import { ListarAgendamentosComponent } from './pages/listar-agendamentos/listar-agendamentos.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'cadastro-paciente', 
    component: CadastroPacienteComponent 
  },
  { 
    path: 'cadastro-agendamento',
    component: CadastroAgendamentoComponent 
  }, 
  {
    path: 'listar-pacientes', 
    component: ListarPacientesComponent  
  },
  { 
    path: 'listar-agendamentos',
    component: ListarAgendamentosComponent 
  }, 
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home' 
  }
];
