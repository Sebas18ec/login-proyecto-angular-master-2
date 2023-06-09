import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reingreso',
  templateUrl: './reingreso.component.html',
  styleUrls: ['./reingreso.component.css']
})
export class ReingresoComponent {
  reingreso: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getReingreso()
  }
  
  getReingreso(): void {
    this.http.get<any[]>('https://aspnetback.azurewebsites.net/api/ControladorAPI/trabajador/GetEsReingreso').subscribe(
      data => {
        this.reingreso = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
