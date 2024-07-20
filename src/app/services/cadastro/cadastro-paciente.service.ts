import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PacienteModel } from '../../model/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = '/api/CadastroPaciente';
  private pacientesSubject = new BehaviorSubject<PacienteModel[]>([]);
  pacientes$ = this.pacientesSubject.asObservable();
  
  constructor(private _http: HttpClient) {}

  cadastrarPaciente(paciente: PacienteModel): Observable<PacienteModel> {
    return this._http.post<PacienteModel>(`${this.apiUrl}/InserirPaciente`,paciente);
  }

  listarPacientes(): Observable<PacienteModel[]> {
    return this._http.get<PacienteModel[]>(`${this.apiUrl}/ListarPacientes`);
  }

  atualizarPaciente(paciente: PacienteModel): Observable<PacienteModel> {
    const pacienteBody = { ...paciente };
    return this._http.put<PacienteModel>(`${this.apiUrl}/AlterarPaciente/${paciente.id}`,pacienteBody);
  }

  excluirPaciente(id: number): Observable<string> {
    return this._http.delete<string>(`${this.apiUrl}/DeletarPaciente/${id}`);
  }

  getPacientes() {
    const storedPacientes = localStorage.getItem('pacientes');
    if (storedPacientes) {
      this.pacientesSubject.next(JSON.parse(storedPacientes));
    }
    return this.pacientes$;
  }

  addPaciente(paciente: PacienteModel) {
    const pacientes = this.pacientesSubject.value;
    pacientes.push(paciente);
    this.pacientesSubject.next(pacientes);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }
}
