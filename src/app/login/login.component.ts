import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emisores: any;
  selectedEmisor: string;
  mensajeError: any;
  username!: string;
  password!: string;
  emisorComp: any;
  logoUrl: any;
  fechaActual: string | undefined;

  minLength = {
    username: 4,
    password: 5
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private emisorService: EmisorService, private router: Router) {
    this.selectedEmisor = '';
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');
    this.fechaActual = new Date().toLocaleDateString();
  }

  onlyNumbers(event: KeyboardEvent, maxLength: number) {
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab';
    const isMaxLengthReached = (event.target as HTMLInputElement).value.length >= maxLength;
    const isNumberKey = /^[0-9]+$/.test(event.key); // Agrega esta línea para validar si la tecla presionada es un número  

    if (!isAllowedKey && (!isNumberKey || isMaxLengthReached)) { // Actualiza esta línea para verificar si la tecla no es permitida o si se alcanzó la longitud máxima  
      event.preventDefault();
    }
  }




  ngOnInit() {
    this.http.get<any>('api/ControladorAPI/api/v1/emisores')
      .subscribe((data: any[]) => {
        this.emisores = data.map(emisor => {
          return {
            NombreEmisor: emisor.NombreEmisor,
            Codigo: emisor.Codigo
          };
        });
      });
  }


  onChangeEmisor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const emisorNombre = target.options[selectedIndex].value;
    this.emisorComp = emisorNombre;
  }

  loggedIn = false;


  mostrarFechaActual() { const fechaActual = new Date().toLocaleDateString(); const mensaje = `Hola ${this.emisorComp}, hoy es ${fechaActual}.`; Swal.fire('Fecha Actual', mensaje, 'info'); }

  onSubmit() {
    if (!this.username || !this.password || !this.emisorComp) {
      Swal.fire('Datos incorrectos, intenta de nuevo con estas credenciles');
      return;
    }

    const loginData = {
      usuario: this.username,
      contrasena: this.password
    };

    this.http.post('api/ControladorAPI/login', loginData)
      .subscribe(response => {
        const data = JSON.stringify(response);
        const responseObj = JSON.parse(data);

        const emisorData = {
          compania: responseObj[0].COMPANIA,
          nombre: responseObj[0].NOMBREEMISOR.trim(),
          ruc: responseObj[0].RucUsuario,
          OBSERVACION: responseObj[0].OBSERVACION
        };

        if (this.emisorComp === emisorData.nombre && emisorData.OBSERVACION === 'INGRESO EXITOSO') {
          Swal.fire({
            title: 'Bienvenido, ' + this.emisorComp,
            html: ' <h6>Fecha:</h6>'  + this.fechaActual,
            showCancelButton: false,
          })
          this.emisorService.updateEmisorData(emisorData);
          this.router.navigate(['/home']);
          this.loggedIn = true; // actualiza el estado de inicio de sesión del usuario  
        } else {
          Swal.fire('Error');
        }
      }, error => {
        console.log(error);
        Swal.fire('Error');
      });
  }
}

