import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent {

  codigo: number | undefined;
  descripcion: string | undefined;
  apiResponse: any;

  constructor(private http: HttpClient,private router: Router) { } // Inyecta HttpClient en el constructor
  
  ngOnInit(): void {
    const apiUrl = 'api/ControladorAPI/api/v1/emisores';
    this.http.get(apiUrl).subscribe((response) => {
      this.apiResponse = response;
      console.log(this.apiResponse)
    });
  }


  onSubmit() {
    const url = `api/ControladorAPI/centrocostos/insert?codigoCentroCostos=${this.codigo}&descripcionCentroCostos=${this.descripcion}`;
    //const url = 'api/ControladorAPI/centrocostos/insert';
    //const body = { codigoCentroCostos: this.codigo, descripcionCentroCostos: this.descripcion };
    //console.log(body)
    
   
    
    this.http.post(url, {}).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Se ha ingresado exitosamente');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        Swal.fire('¡Error!');
        this.router.navigate(['/home']);
     
      }
    );
    /*this.checkServerConnection(url).subscribe(
      (connected) => {
        if (connected) {
          this.http.post(url, body).subscribe(
            (response) => {
              console.log(response);
              Swal.fire('Se ha ingresado exitosamente');
              this.router.navigate(['/home']);
            },
            (error) => {
              console.error(error);
              Swal.fire('¡Error!');
              this.router.navigate(['/home']);
            }
          );
        } else {
          Swal.fire('¡Error de conexión!');
        }
      }
    );*/
  }

  /*checkServerConnection(url: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.timeout = 5000; // tiempo máximo de espera de la conexión en milisegundos
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        }
      };
      xhr.onerror = () => {
        observer.next(false);
        observer.complete();
      };
      xhr.ontimeout = () => {
        observer.next(false);
        observer.complete();
      };
      xhr.send();
    });
  }*/
  

}
