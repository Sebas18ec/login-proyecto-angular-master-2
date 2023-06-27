import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nivel-salarial',
  templateUrl: './nivel-salarial.component.html',
  styleUrls: ['./nivel-salarial.component.css']
})
export class NivelSalarialComponent {
  nivelSalarial: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getNivelSalarial()
  }
  
  getNivelSalarial(): void {
    this.http.get<any[]>('api/ControladorAPI/trabajador/GetNivelSalarial').subscribe(
      data => {
        this.nivelSalarial = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
