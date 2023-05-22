import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmisorService } from 'src/app/shared/emisor.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent {
  trabajadores: any[] = [];
  datosTablaOriginal: any[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  emisorSeleccionado: any;
  mensaje: any = "";
  mensaje2: any = "";

  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) {} 

  ngOnInit() {
    this.fetchTrabajadores()
  }

  fetchTrabajadores(): void {
    const codigoEmisorSeleccionado = this.emisorService.getEmisorData().compania;
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>(`api/ControladorAPI/trabajador/select?sucursal=${codigoEmisorSeleccionado}`).subscribe(
      data => {
        this.trabajadores = data;
        this.datosTablaOriginal = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarTrabajador(sucursal: number, idEmpleado: string) {
    const params = new HttpParams()
      .set('sucursal', sucursal.toString())
      .set('codigoempleado', idEmpleado);
  
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar el trabajador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.get('api/ControladorAPI/trabajador/delete', { params }).subscribe(
          result => {
            // console.log(result);
            Swal.fire('Se ha eliminado exitosamente').then(() => {
              // Realizar acciones adicionales después de eliminar
              this.fetchTrabajadores()
            });
          },
          error => {
            console.error(error);
            Swal.fire('Ocurrió un error al eliminar al intentar eliminar el trabajador', '', 'error');
          }
        );
      }
    });
  }
  
}
