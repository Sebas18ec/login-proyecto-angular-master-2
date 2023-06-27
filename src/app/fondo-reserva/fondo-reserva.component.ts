import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fondo-reserva',
  templateUrl: './fondo-reserva.component.html',
  styleUrls: ['./fondo-reserva.component.css']
})
export class FondoReservaComponent {
  fondoReserva: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getFondoReserva()
  }
  
  getFondoReserva(): void {
    this.http.get<any[]>('https://aspnetback.azurewebsites.net/api/ControladorAPI/trabajador/GetFondoReserva').subscribe(
      data => {
        this.fondoReserva = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
