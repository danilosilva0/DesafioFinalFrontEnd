import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgendamentoModel } from '../../model/agendamento.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private apiUrl = '/api/CadastroAgendamento';
  
  constructor(private _http: HttpClient) {}

  cadastrarAgendamento(agendamento: AgendamentoModel): Observable<AgendamentoModel> {
    return this._http.post<AgendamentoModel>(`${this.apiUrl}/InserirAgendamento`, agendamento);
  }

  listarAgendamentos(): Observable<AgendamentoModel[]> {
    return this._http.get<AgendamentoModel[]>(`${this.apiUrl}/ListarAgendamentos`);
  }

  atualizarAgendamento(agendamento: AgendamentoModel): Observable<AgendamentoModel> {
    const agendamentoBody = { ...agendamento };
    return this._http.put<AgendamentoModel>(`${this.apiUrl}/AlterarAgendamento/${agendamento.id}`, agendamentoBody);
  }

  excluirAgendamento(id: number): Observable<string> {
    return this._http.delete<string>(`${this.apiUrl}/DeletarAgendamento/${id}`);
  }

}
