import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-decimos',
  templateUrl: './decimos.component.html',
  styleUrls: ['./decimos.component.css']
})
export class DecimosComponent {
  decimos: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getDecimos()
  }
  
  getDecimos(): void {
    this.http.get<any[]>('api/ControladorAPI/trabajador/GetDecimoTerceroDecimoCuarto').subscribe(
      data => {
        this.decimos = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
