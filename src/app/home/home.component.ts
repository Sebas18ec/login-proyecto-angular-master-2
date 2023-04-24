import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { DomSanitizer } from '@angular/platform-browser';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
  codigo: number | undefined;
  descripcion: string | undefined;
  apiResponse: any;

  

  constructor(private emisorService: EmisorService,private sanitizer: DomSanitizer, private http: HttpClient,private router: Router) {
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
    this.router.navigate(['/insertar']);
  }

  eliminarCentroCostos(codigo: number, descripcion: string) {
    const params = new HttpParams()
        .set('codigocentrocostos', codigo.toString())
        .set('descripcioncentrocostos', descripcion);

    if (confirm('¿Está seguro que desea eliminar el centro de costos?')) {
      this.http.get('/api/ControladorAPI/api/centrocostos/delete', { params }).subscribe(result => {
        console.log(result);
        Swal.fire('Se ha eliminado exitosamente').then(() => {
          location.reload();
        });
      }, error => {
        console.error(error);
        Swal.fire('Ocurrió un error al eliminar el centro de costos', '', 'error');
      });
    }
  }

  
  

}
