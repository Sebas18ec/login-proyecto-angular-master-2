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
  busqueda: string = '';
  nombreBusqueda: string = '';
  mostrarFormularioCentroCostos = false;
  fechaActual: string;
  nombreUsuario: string = 'no logeado';
  sesionIniciada: boolean = false;
  mostrarMovimientosPlanilla: boolean = false;
  

  constructor(private emisorService: EmisorService,private sanitizer: DomSanitizer, private http: HttpClient,private router: Router) {
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  
    this.fechaActual = new Date().toLocaleDateString();
    const sesionGuardada = localStorage.getItem('sesionIniciada');
    this.sesionIniciada = sesionGuardada === 'true';
    const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
    this.sesionIniciada = sesionGuardada === 'true';
    if (nombreUsuarioGuardado !== null) {
      this.nombreUsuario = nombreUsuarioGuardado;
    }    
   }

  ngOnInit(): void {
    const emisorData = this.emisorService.getEmisorData();
    console.log(emisorData)
    this.emisorNombre = emisorData.nombre;
    this.emisorRuc = emisorData.ruc;

    this.http.get<any[]>('https://aspnetback.azurewebsites.net/api/ControladorAPI/api/v1/centrocostos').subscribe(
      data => {
        this.centroCostos = data;
        console.log(this.centroCostos)
      },
      error => {
        console.log(error);
      }
    );
    
    window.onbeforeunload = () => {
      localStorage.setItem('sesionIniciada', this.sesionIniciada.toString());
    };
  }

  abrirVentanaLogin(): void {
    if (!this.sesionIniciada) {
      Swal.fire({
        title: 'Iniciar Sesión',
        html:
          '<input id="swal-input-usuario" class="swal2-input" placeholder="Usuario" maxlength="3">' +
          '<input id="swal-input-password" class="swal2-input" placeholder="Contraseña" type="password" maxlength="4">',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Iniciar Sesión',
        focusConfirm: false,
        didOpen: () => {
          const usuarioInput = document.getElementById('swal-input-usuario') as HTMLInputElement;
          usuarioInput.addEventListener('keypress', this.onlyNumbers);
  
          const passwordInput = document.getElementById('swal-input-password') as HTMLInputElement;
          passwordInput.addEventListener('keypress', this.onlyLettersAndNumbers);
        },
        preConfirm: () => {
          const usuarioInput = document.getElementById('swal-input-usuario') as HTMLInputElement;
          const usuario = usuarioInput.value.trim();
  
          // Validar el campo de usuario
          if (!usuario || usuario.length > 5) {
            Swal.showValidationMessage('El campo de usuario debe contener máximo 5 números');
            return false;
          }
  
          // Resto de la validación del campo de contraseña
          const passwordInput = document.getElementById('swal-input-password') as HTMLInputElement;
          const password = passwordInput.value.trim();
  
          // Validar el campo de contraseña
          if (!password || !/^[a-zA-Z0-9]+$/.test(password)) {
            Swal.showValidationMessage('El campo de contraseña solo permite letras y números');
            return false;
          }
  
          return true; // Devolver true si la validación es exitosa
        },
        willClose: () => {
          const usuarioInput = document.getElementById('swal-input-usuario') as HTMLInputElement;
          usuarioInput.removeEventListener('keypress', this.onlyNumbers);
  
          const passwordInput = document.getElementById('swal-input-password') as HTMLInputElement;
          passwordInput.removeEventListener('keypress', this.onlyLettersAndNumbers);
        }
        }).then((result) => {
        if (result.isConfirmed) {
          const usuario = (document.getElementById('swal-input-usuario') as HTMLInputElement).value;
          const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;
    
          const endpoint = 'https://aspnetback.azurewebsites.net/api/ControladorAPI/loginAutorizador';
          const url = new URL(endpoint, window.location.origin);
    
          url.searchParams.append('usuario', usuario);
          url.searchParams.append('password', password);
    
          fetch(url.toString())
            .then(response => response.json())
            .then(responseObj => {
              if (responseObj[0].OBSERVACION === 'INGRESO EXITOSO') {
                Swal.fire({
                  icon: 'success',
                  title: '¡Inicio de sesión exitoso!',
                  text: 'Bienvenido al sistema.'
                });
                this.mostrarFormularioCentroCostos = true;
                this.nombreUsuario = responseObj[0].NOMBREUSUARIO;
                this.sesionIniciada = true;
                // Al iniciar sesión
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('nombreUsuario', responseObj[0].NOMBREUSUARIO); // Reemplaza "nombreUsuario" con el valor real
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Inicio de sesión fallido',
                  text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.'
                });
              }
            })
            .catch(error => {
              console.error('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error durante el inicio de sesión. Por favor, inténtalo de nuevo.'
              });
            });
        }
      });
    }
  }

  cerrarSesion(): void {
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'La sesión de usuario ha sido cerrada.',
      timer: 2000, // Duración del mensaje en milisegundos
      timerProgressBar: true,
      showConfirmButton: false
    });
    this.sesionIniciada = false;
    this.nombreUsuario = 'no logeado';
    this.mostrarFormularioCentroCostos = false;
    localStorage.setItem('nombreUsuario', 'no logeado'); // Reemplaza "nombreUsuario" con el valor real
  }
  
  //CRUD CENTRO COSTOS
  nuevoCentroCostos() {
    Swal.fire({
      title: 'Añadir nuevo Centro de Costos',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Código" onkeypress="onlyNumbers(event)" maxlength="5">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Descripción" onkeypress="onlyLettersAndNumbers(event)">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Crear',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        input1.addEventListener('keypress', this.onlyNumbers);
        
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.addEventListener('keypress', this.onlyLettersAndNumbers);
      },
      preConfirm: () => {
        const codigo = (document.getElementById('swal-input1') as HTMLInputElement).value.toString().trim();
        const descripcion = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
        
        if (!codigo || !descripcion) {
          Swal.showValidationMessage('Ambos campos son requeridos');
          return false;
        }
        
        this.guardarNuevoCentroCostos(codigo, descripcion);
        return true; // Agregar esta línea
      },       
      willClose: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        input1.removeEventListener('keypress', this.onlyNumbers);
        
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.removeEventListener('keypress', this.onlyLettersAndNumbers);
      }
    });
  } 
  
  guardarNuevoCentroCostos(codigo: string, descripcion: string) {
    if (codigo && descripcion) {
      const url = `https://aspnetback.azurewebsites.net/api/ControladorAPI/CentroCostosInsert?codigoCentroCostos=${codigo}&descripcionCentroCostos=${descripcion}`;
      this.http.get(url).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            title: 'Se ha ingresado exitosamente',
            icon: 'success',
            showCancelButton: false,
          }).then(() => {
            // Actualizar la tabla sin recargar la página
            this.actualizarTablaCentroCostos();
          });
        },
        (error) => {
          console.error(error);
          Swal.fire('¡Error!');
        }
      );
    }
  }

  editarCentroCostos(codigo: number): void {
    const centroCosto = this.centroCostos.find(cc => cc.codigo === codigo);
  
    Swal.fire({
      title: 'Editar Centro de Costos',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Código" value="' + centroCosto.codigo + '" readonly>' +
        // '<input id="swal-input2" class="swal2-input" placeholder="Nombre Centro de Costos">',
        '<input id="swal-input2" class="swal2-input" placeholder="Nombre Centro de Costos" value="' + centroCosto.nombreCentroCostos + '">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.addEventListener('keypress', this.onlyLettersAndNumbers);
      },
      preConfirm: () => {
        const codigo = parseInt((document.getElementById('swal-input1') as HTMLInputElement).value, 10);
        const nombreCentroCostos = (document.getElementById('swal-input2') as HTMLInputElement).value;
        if (!nombreCentroCostos) {
          Swal.showValidationMessage('El campo "Nombre Centro de Costos" es requerido');
          return false;
        }
        this.guardarCambiosCentroCostos(codigo, nombreCentroCostos);
        return true;
      },
      willClose: () => {
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        input2.removeEventListener('keypress', this.onlyLettersAndNumbers);
      }
    });
  }
  
  onlyLettersAndNumbers(event: KeyboardEvent): void {
    const input = event.key;
    const isLetterOrNumber = /^[a-zA-Z0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab' || event.code === 'Space';
  
    if (!isLetterOrNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }
  
  onlyNumbers(event: KeyboardEvent): void {
    const input = event.key;
    const isNumber = /^[0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab';
  
    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }

  getDescripcionCentroCostos(codigo: number): string {
    // Aquí haces una llamada al API para obtener el nombre del centro de costos con este código
    return this.centroCostos.find(cc => cc.codigo === codigo)?.nombre || '';
  }

  guardarCambiosCentroCostos(codigo: number, nombre: string): void {
    const url = `api/ControladorAPI/CentroCostosEdit?codigoCentroCostos=${codigo}&descripcionCentroCostos=${nombre}`;
    this.http.get(url).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: 'Cambios guardados',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.actualizarTablaCentroCostos();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire('Error al guardar los cambios', '', 'error');
      }
    );
  }
  
  actualizarTablaCentroCostos() {
    this.http.get<any[]>('https://aspnetback.azurewebsites.net/api/ControladorAPI/api/v1/centrocostos').subscribe(
      data => {
        this.centroCostos = data;
        console.log(this.centroCostos);
      },
      error => {
        console.log(error);
      }
    );
  }

  CentroCostos(): void {
    if (!this.sesionIniciada) {
      this.abrirVentanaLogin();
    } else {
      // Aquí puedes colocar la lógica para mostrar el contenido del "Centro de Costos"
      this.mostrarFormularioCentroCostos = true;
    }
  }

  eliminarCentroCostos(codigo: number, descripcion: string) {
    const params = new HttpParams()
      .set('codigocentrocostos', codigo.toString())
      .set('descripcioncentrocostos', descripcion);
  
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar el centro de costos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.get('https://aspnetback.azurewebsites.net/api/ControladorAPI/api/centrocostos/delete', { params }).subscribe(
          result => {
            console.log(result);
            Swal.fire('Se ha eliminado exitosamente').then(() => {
              this.actualizarTablaCentroCostos();
            });
          },
          error => {
            console.error(error);
            Swal.fire('Ocurrió un error al eliminar el centro de costos', '', 'error');
          }
        );
      }
    });
  }
  

}
