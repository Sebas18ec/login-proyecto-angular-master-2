import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estado-trabajador',
  templateUrl: './estado-trabajador.component.html',
  styleUrls: ['./estado-trabajador.component.css']
})
export class EstadoTrabajadorComponent {
  estadoTrabajador: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getEstadoTrabajador()
  }
  
  getEstadoTrabajador(): void {
    this.http.get<any[]>('api/ControladorAPI/trabajador/GetEstadoTrabajador').subscribe(
      data => {
        this.estadoTrabajador = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
