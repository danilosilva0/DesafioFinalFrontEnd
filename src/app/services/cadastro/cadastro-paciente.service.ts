import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteModel } from '../../model/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class CadastrarPacienteService {
  private apiUrl = '/api';
  private _http = inject(HttpClient);

  cadastrarPaciente(paciente: PacienteModel): Observable<PacienteModel> {
    return this._http.post<PacienteModel>(`${this.apiUrl}/Desafio/InserirPaciente`,paciente);
  }

  listarPacientes(): Observable<PacienteModel[]> {
    return this._http.get<PacienteModel[]>(`${this.apiUrl}/Desafio/ListarTodosPacientes`);
  }

  atualizarPaciente(paciente: PacienteModel): Observable<PacienteModel> {
    const pacienteBody = { ...paciente };
    return this._http.put<PacienteModel>(`${this.apiUrl}/Desafio/AtualizarPaciente/${paciente.id}`,pacienteBody);
  }

  excluirPaciente(id: number): Observable<string> {
    return this._http.delete<string>(`${this.apiUrl}/Desafio/DeletarPaciente/${id}`);
  }
}
