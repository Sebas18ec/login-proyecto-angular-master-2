import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo-comision',
  templateUrl: './tipo-comision.component.html',
  styleUrls: ['./tipo-comision.component.css']
})
export class TipoComisionComponent {
  tipoComision: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getTipoComision()
  }
  
  getTipoComision(): void {
    this.http.get<any[]>('api/ControladorAPI/trabajador/GetTipoComision').subscribe(
      data => {
        this.tipoComision = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
