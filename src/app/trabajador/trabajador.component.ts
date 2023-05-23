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
  tipoTrabajadorOptions: any[] = [];
  generoOptions: any[] = [];
  centroCostosOptions: any[] = [];
  estadoTrabajadorOptions: any[] = [];
  tipoContratoOptions: any[] = [];
  tipoCeseOptions: any[] = [];
  estadoCivilOptions: any[] = []
  esReingresoOptions: any[] = []
  tipoCuentaOptions: any[] = []

  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) {} 

  ngOnInit() {
    this.fetchTrabajadores()

    this.http.get<any[]>('api/ControladorAPI/trabajador/GetTipoTrabajador')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoTrabajadorOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetGenero')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.generoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/api/v1/centrocostos')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.NombreCentroCostos // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.centroCostosOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetEstadoTrabajador')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.estadoTrabajadorOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetTipoContrato')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoContratoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetTipoCese')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoCeseOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetEstadoCivil')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.estadoCivilOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetEsReingreso')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.esReingresoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('api/ControladorAPI/trabajador/GetTipoCuenta')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Codigo // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoCuentaOptions = data;
        },
          error => {
            console.log(error);
          }
      );
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

  getOptionsTipoTrabajador(): { value: string, label: string }[] {
    return this.tipoTrabajadorOptions;
  }

  getOptionsGenero(): { value: string, label: string }[] {
    return this.generoOptions;
  }

  getOptionsCentroCostos(): { value: string, label: string }[] {
    return this.centroCostosOptions;
  }

  getOptionsEstadoTrabajador(): { value: string, label: string }[] {
    return this.estadoTrabajadorOptions;
  }

  getOptionsTipoContrato(): { value: string, label: string }[] {
    return this.tipoContratoOptions;
  }

  getOptionsTipoCese(): { value: string, label: string }[] {
    return this.tipoCeseOptions;
  }

  getOptionsEstadoCivil(): { value: string, label: string }[] {
    return this.estadoCivilOptions;
  }

  getOptionsEsReingreso(): { value: string, label: string }[] {
    return this.esReingresoOptions;
  }

  getOptionsTipoCuenta(): { value: string, label: string }[] {
    return this.tipoCuentaOptions;
  }

  nuevoTrabajador(){
    const codigoEmisorSeleccionado = this.emisorService.getEmisorData().compania;
    Swal.fire({
      title: 'Añadir nuevo Trabajador',
      html:
      '<div class="swal2-input-container" style="column-count: 5; column-gap: 1em;">' +
      '<label for="swal-input1">Codigo Compañia</label>' +
      '<input id="swal-input1" class="swal2-input" placeholder="Cod. Compañia" value="' + codigoEmisorSeleccionado + '" readonly>' +
      '<select id="swal-input2" class="swal2-input">' +
        '<option value="">Tipo Trabajador</option>' +
        this.getOptionsTipoTrabajador().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Apellido Paterno">' +
      '<input id="swal-input4" class="swal2-input" placeholder="Apellido Materno">' +
      '<input id="swal-input5" class="swal2-input" placeholder="Nombres">' +
      '<input id="swal-input6" class="swal2-input" placeholder="Identificación">' +
      '<input id="swal-input7" class="swal2-input" placeholder="Entidad Bancaria">' +
      '<input id="swal-input8" class="swal2-input" placeholder="Carnet IESS">' +
      '<input id="swal-input9" class="swal2-input" placeholder="Dirección">' +
      '<input id="swal-input10" class="swal2-input" placeholder="Telefono fijo">' +
      '<input id="swal-input11" class="swal2-input" placeholder="Telefono movil">' +
      '<select id="swal-input12" class="swal2-input">' +
        '<option value="">Genero</option>' +
        this.getOptionsGenero().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select>' +
      '<input id="swal-input13" class="swal2-input" placeholder="Nro. Cta. Bancaria">' +
      '<input id="swal-input14" class="swal2-input" placeholder="Codigo Categoria Ocupacion">' +
      '<input id="swal-input15" class="swal2-input" placeholder="Ocupación">' +
      '<select id="swal-input16" class="swal2-input">' +
        '<option value="">Centro Costos</option>' +
        this.getOptionsCentroCostos().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select>' +
      '<input id="swal-input17" class="swal2-input" placeholder="Nivel Salarial">' +
      '<select id="swal-input18" class="swal2-input">' +
        '<option value="">Estado Trabajador</option>' +
        this.getOptionsEstadoTrabajador().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select>' +
      '<select id="swal-input19" class="swal2-input">' +
        '<option value="">Tipo Contrato</option>' +
        this.getOptionsTipoContrato().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select>' +
      '<select id="swal-input20" class="swal2-input">' +
        '<option value="">Tipo Cese</option>' +
        this.getOptionsTipoCese().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select><br>' +
      '<select id="swal-input21" class="swal2-input">' +
        '<option value="">Estado Civil</option>' +
        this.getOptionsEstadoCivil().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select>' +
      '<input id="swal-input22" class="swal2-input" placeholder="Tipo Comisión">' +
      '<label for="swal-input23">Fecha Nacimiento</label>' +
      '<input id="swal-input23" class="swal2-input" type="date">' +
      '<label for="swal-input24">Fecha Ingreso</label>' +
      '<input id="swal-input24" class="swal2-input" type="date">' +
      '<label for="swal-input25">Fecha Cese</label>' +
      '<input id="swal-input25" class="swal2-input" type="date">' +
      '<input id="swal-input26" class="swal2-input" type="number" placeholder="Periodo Vacaciones">' +
      '<label for="swal-input27">Fecha Reingreso</label>' +
      '<input id="swal-input27" class="swal2-input" type="date">' +
      '<label for="swal-input28">Fecha última actualizacion</label>' +
      '<input id="swal-input28" class="swal2-input" type="date">' +
      '<select id="swal-input29" class="swal2-input">' +
        '<option value="">¿Es reingreso?</option>' +
        this.getOptionsEsReingreso().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select><br>' +
      '<input id="swal-input30" class="swal2-input" placeholder="Banco CTA. CTE" onkeypress="onlyNumbers(event)">' +
      '<select id="swal-input31" class="swal2-input">' +
        '<option value="">Tipo Cuenta</option>' +
        this.getOptionsTipoCuenta().map(option => `<option value="${option.value}">${option.label}</option>`).join('') +
      '</select><br>' +
      '<input id="swal-input32" class="swal2-input" placeholder="RSV_Indem_Acumul" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input33" class="swal2-input" placeholder="Año_Ult_Rsva_Indemni" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input34" class="swal2-input" placeholder="Mes_Ult_Rsva_Indemni" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input35" class="swal2-input" placeholder="FormaCalculo13ro" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input36" class="swal2-input" placeholder="FormaCalculo14ro" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input37" class="swal2-input" placeholder="BoniComplementaria" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input38" class="swal2-input" placeholder="BoniEspecial" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input39" class="swal2-input" placeholder="Remuneracion_Minima" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input40" class="swal2-input" placeholder="CuotaCuentaCorriente" onkeypress="onlyNumbers(event)">' +
      '<input id="swal-input41" class="swal2-input" placeholder="Fondo_Reserva">' +
    '</div>',
      width: '95%',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Crear',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const inputs = [
          'swal-input2',
          'swal-input4',
          'swal-input5',
          'swal-input6',
          'swal-input7',
          'swal-input11',
          'swal-input12',
          'swal-input13',
          'swal-input14',
          'swal-input15',
          'swal-input16',
          'swal-input17',
          'swal-input18',
          'swal-input19',
          'swal-input20',
          'swal-input21',
          'swal-input22',
          'swal-input23',
          'swal-input24',
          'swal-input25',
          'swal-input26',
          'swal-input27',
          'swal-input28',
          'swal-input29',
          'swal-input30',
          'swal-input31',
          'swal-input32',
          'swal-input33',
          'swal-input34',
          'swal-input35',
          'swal-input36',
          'swal-input37',
          'swal-input38',
          'swal-input39',
          'swal-input40',
          'swal-input41',
        ];
        inputs.forEach((inputId) => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          input.addEventListener('keypress', this.onlyNumbers);
        });
      },
      preConfirm: () => {
        const COMP_Codigo = parseInt((document.getElementById('swal-input1') as HTMLInputElement).value, 10);
        const Tipo_trabajadorSelect = (document.getElementById('swal-input2') as HTMLInputElement);
        const Tipo_trabajador = Tipo_trabajadorSelect.value.trim();
        const Apellido_Paterno = (document.getElementById('swal-input3') as HTMLInputElement).value.trim();
        const Apellido_Materno = (document.getElementById('swal-input4') as HTMLInputElement).value.trim();
        const Nombres = (document.getElementById('swal-input5') as HTMLInputElement).value.trim();
        const Identificacion = (document.getElementById('swal-input6') as HTMLInputElement).value.trim();
        const Entidad_Bancaria = (document.getElementById('swal-input7') as HTMLInputElement).value.trim();
        const CarnetIESS = (document.getElementById('swal-input8') as HTMLInputElement).value.trim();
        const Direccion = (document.getElementById('swal-input9') as HTMLInputElement).value.trim();
        const Telefono_Fijo = (document.getElementById('swal-input10') as HTMLInputElement).value.trim();
        const Telefono_Movil = (document.getElementById('swal-input11') as HTMLInputElement).value.trim();
        const GeneroSelect = (document.getElementById('swal-input12') as HTMLInputElement);
        const Genero = GeneroSelect.value.trim();
        const Nro_Cuenta_Bancaria = (document.getElementById('swal-input13') as HTMLInputElement).value.trim();
        const Codigo_Categoria_Ocupacion = (document.getElementById('swal-input14') as HTMLInputElement).value.trim();
        const Ocupacion = (document.getElementById('swal-input15') as HTMLInputElement).value.trim();
        const CentroCostosSelect = (document.getElementById('swal-input16') as HTMLInputElement);
        const Centro_Costos = CentroCostosSelect.value.trim();
        const Nivel_Salarial = (document.getElementById('swal-input17') as HTMLInputElement).value.trim();
        const EstadoTrabajadorSelect = (document.getElementById('swal-input18') as HTMLInputElement);
        const EstadoTrabajador = EstadoTrabajadorSelect.value.trim();
        const Tipo_ContratoSelect = (document.getElementById('swal-input19') as HTMLInputElement);
        const Tipo_Contrato = Tipo_ContratoSelect.value.trim();
        const Tipo_CeseSelect = (document.getElementById('swal-input20') as HTMLInputElement);
        const Tipo_Cese = Tipo_CeseSelect.value.trim();
        const EstadoCivilSelect = (document.getElementById('swal-input21') as HTMLInputElement);
        const EstadoCivil = EstadoCivilSelect.value.trim();
        const TipodeComision = (document.getElementById('swal-input22') as HTMLInputElement).value.trim();
        const FechaNacimientoString = (document.getElementById('swal-input23') as HTMLInputElement).value.trim();
        const FechaIngresoString = (document.getElementById('swal-input24') as HTMLInputElement).value.trim();
        const FechaCeseString = (document.getElementById('swal-input25') as HTMLInputElement).value.trim();
        const FechaNacimiento = new Date(FechaNacimientoString);
        const FechaIngreso = new Date(FechaIngresoString);
        const FechaCese = new Date(FechaCeseString);
        const PeriododeVacaciones = parseInt((document.getElementById('swal-input26') as HTMLInputElement).value.trim())
        const FechaReingresoString = (document.getElementById('swal-input27') as HTMLInputElement).value.trim();
        const Fecha_Ult_ActualizacionString = (document.getElementById('swal-input28') as HTMLInputElement).value.trim();
        const FechaReingreso = new Date(FechaReingresoString);
        const Fecha_Ult_Actualizacion = new Date(Fecha_Ult_ActualizacionString);
        const EsReingresoSelect = (document.getElementById('swal-input29') as HTMLInputElement);
        const EsReingreso = EsReingresoSelect.value.trim();
        const BancoCTA_CTE = parseInt((document.getElementById('swal-input30') as HTMLInputElement).value, 10);
        const Tipo_CuentaSelect = (document.getElementById('swal-input31') as HTMLInputElement);
        const Tipo_Cuenta = Tipo_CuentaSelect.value.trim();
        const RSV_Indem_Acumul = parseInt((document.getElementById('swal-input32') as HTMLInputElement).value, 10);
        const Año_Ult_Rsva_Indemni = parseInt((document.getElementById('swal-input33') as HTMLInputElement).value, 10);
        const Mes_Ult_Rsva_Indemni = parseInt((document.getElementById('swal-input34') as HTMLInputElement).value, 10);
        const FormaCalculo13ro = parseInt((document.getElementById('swal-input35') as HTMLInputElement).value, 10);
        const FormaCalculo14ro = parseInt((document.getElementById('swal-input36') as HTMLInputElement).value, 10);
        const BoniComplementaria = parseInt((document.getElementById('swal-input37') as HTMLInputElement).value, 10);
        const BoniEspecial = parseInt((document.getElementById('swal-input38') as HTMLInputElement).value, 10);
        const Remuneracion_Minima = parseInt((document.getElementById('swal-input39') as HTMLInputElement).value, 10);
        const CuotaCuentaCorriente = parseInt((document.getElementById('swal-input40') as HTMLInputElement).value, 10);
        const Fondo_Reserva = (document.getElementById('swal-input41') as HTMLInputElement).value.trim();
        
        // if (!concepto || !prioridad || !tipoOperacion || !cuenta1 || !cuenta2 || !cuenta3 || !cuenta4 || !movimientoExcepcion1 || !movimientoExcepcion2 || !movimientoExcepcion3 || !Traba_Aplica_iess || !Traba_Proyecto_imp_renta || !Aplica_Proy_Renta || !Empresa_Afecta_Iess) {
        //   Swal.showValidationMessage('Todos los campos son requeridos');
        //   return false;
        // }
        
        this.guardarNuevoTrabajador(
          COMP_Codigo,
          Tipo_trabajador,
          Apellido_Paterno,
          Apellido_Materno,
          Nombres,
          Identificacion,
          Entidad_Bancaria,
          CarnetIESS,
          Direccion,
          Telefono_Fijo,
          Telefono_Movil,
          Genero,
          Nro_Cuenta_Bancaria,
          Codigo_Categoria_Ocupacion,
          Ocupacion,
          Centro_Costos,
          Nivel_Salarial,
          EstadoTrabajador,
          Tipo_Contrato,
          Tipo_Cese,
          EstadoCivil,
          TipodeComision,
          FechaNacimiento,
          FechaIngreso,
          FechaCese, 
          PeriododeVacaciones,
          FechaReingreso, 
          Fecha_Ult_Actualizacion, 
          EsReingreso, 
          BancoCTA_CTE,
          Tipo_Cuenta, 
          RSV_Indem_Acumul,
          Año_Ult_Rsva_Indemni,
          Mes_Ult_Rsva_Indemni,
          FormaCalculo13ro, 
          FormaCalculo14ro,
          BoniComplementaria, 
          BoniEspecial,
          Remuneracion_Minima,
          CuotaCuentaCorriente,
          Fondo_Reserva
        );
        return true;
      },
      willClose: () => {
        const inputs = [
          'swal-input2',
          'swal-input4',
          'swal-input5',
          'swal-input6',
          'swal-input7',
          'swal-input11',
          'swal-input12',
          'swal-input13',
          'swal-input14',
          'swal-input15',
          'swal-input16',
          'swal-input17',
          'swal-input18',
          'swal-input19',
          'swal-input20',
          'swal-input21',
          'swal-input22',
          'swal-input23',
          'swal-input24',
          'swal-input25',
          'swal-input26',
          'swal-input27',
          'swal-input28',
          'swal-input29',
          'swal-input30',
          'swal-input31',
          'swal-input32',
          'swal-input33',
          'swal-input34',
          'swal-input35',
          'swal-input36',
          'swal-input37',
          'swal-input38',
          'swal-input39',
          'swal-input40',
          'swal-input41',
        ];
        inputs.forEach((inputId) => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          input.removeEventListener('keypress', this.onlyNumbers);
        });
      }
    });
  }

  guardarNuevoTrabajador(COMP_Codigo: number, Tipo_trabajador: string, Apellido_Paterno: string, Apellido_Materno: string, 
    Nombres : string, Identificacion: string, Entidad_Bancaria: string, CarnetIESS: string, Direccion: string, Telefono_Fijo: string, 
    Telefono_Movil: string, Genero: string , Nro_Cuenta_Bancaria: string, Codigo_Categoria_Ocupacion: string, Ocupacion: string, 
    Centro_Costos: string, Nivel_Salarial: string, EstadoTrabajador: string, Tipo_Contrato: string, Tipo_Cese: string, 
    EstadoCivil: string, TipodeComision: string, FechaNacimiento: Date, FechaIngreso: Date, FechaCese: Date, PeriododeVacaciones: number, 
    FechaReingreso: Date, Fecha_Ult_Actualizacion: Date, EsReingreso: string, BancoCTA_CTE: number, Tipo_Cuenta: string, 
    RSV_Indem_Acumul: number, Año_Ult_Rsva_Indemni: number, Mes_Ult_Rsva_Indemni: number, FormaCalculo13ro: number, FormaCalculo14ro: number, 
    BoniComplementaria: number, BoniEspecial: number, Remuneracion_Minima: number, CuotaCuentaCorriente: number, Fondo_Reserva: string) 
  : void{
    console.log(FechaNacimiento.toISOString())
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
}
