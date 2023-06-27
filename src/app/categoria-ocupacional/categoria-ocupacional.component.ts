import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categoria-ocupacional',
  templateUrl: './categoria-ocupacional.component.html',
  styleUrls: ['./categoria-ocupacional.component.css']
})
export class CategoriaOcupacionalComponent {
  categoriaOcupacional: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getCategoriaOcupacional()
  }
  
  getCategoriaOcupacional(): void {
    this.http.get<any[]>('api/ControladorAPI/trabajador/GetCategoriaOcupacional').subscribe(
      data => {
        this.categoriaOcupacional = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
