import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordenada } from '../modelo/coordenada';
import { AngularFireDatabase } from '@angular/fire/database';
import { TransporteService } from './transporte.service';

@Injectable({
  providedIn: 'root',
})
export class CoordenadaService {
  listaCoordenadas: Observable<Coordenada[]>;
  coordenada: Observable<Coordenada>;

  constructor(private db: AngularFireDatabase, private serviceTransporte: TransporteService) { }

  getCoordenadas(): Observable<Coordenada[]> {
    return this.listaCoordenadas = this.db.list<Coordenada>('Coordenada').valueChanges();
  }

  getCoordenada(ID_TRANSPORTE: string) {
    return this.db.object<Coordenada>('Coordenada/' + ID_TRANSPORTE).valueChanges();
  }

  deleteCoodenada(ID_TRANSPORTE: string) {
    this.db.object<Coordenada>('Coordenada/' + ID_TRANSPORTE).remove();
  }


}
