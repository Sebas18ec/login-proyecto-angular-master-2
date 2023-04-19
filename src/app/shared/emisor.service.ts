import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmisorService {
  private emisorData = {nombre: '', ruc: ''};

  constructor() { }

  updateEmisorData(data: any) {
    this.emisorData = data;
  }

  getEmisorData() {
    return this.emisorData;
  }
}
