import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { DomSanitizer } from '@angular/platform-browser';  
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emisorNombre = '';
  emisorRuc = '';
  logoUrl:any;
  centroCostos: any[] = [];
  datos: any;

  

  constructor(private emisorService: EmisorService,private sanitizer: DomSanitizer, private http: HttpClient) {
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  

   }

  ngOnInit(): void {
    const emisorData = this.emisorService.getEmisorData();
    console.log(emisorData)
    this.emisorNombre = emisorData.nombre;
    this.emisorRuc = emisorData.ruc;

    this.http.get<any[]>('api/ControladorAPI/api/v1/centrocostos').subscribe(
      data => {
        this.centroCostos = data;
        console.log(this.centroCostos)
      },
      error => {
        console.log(error);
      }
    );
    
  }

  nuevoCentroCostos() {
    // Aquí puedes abrir un modal o un formulario de entrada de datos
    // para agregar un nuevo centro de costos
  }
  

}
