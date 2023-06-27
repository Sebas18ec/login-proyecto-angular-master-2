import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-periodo-vacacion',
  templateUrl: './periodo-vacacion.component.html',
  styleUrls: ['./periodo-vacacion.component.css']
})
export class PeriodoVacacionComponent {
  periodoVacacion: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getPeriodoVacacion()
  }
  
  getPeriodoVacacion(): void {
    this.http.get<any[]>('https://aspnetback.azurewebsites.net/api/ControladorAPI/trabajador/GetPeriodoVacaciones').subscribe(
      data => {
        this.periodoVacacion = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
