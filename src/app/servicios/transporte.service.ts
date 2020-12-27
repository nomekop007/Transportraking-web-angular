
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transporte } from '../modelo/transporte';
import { LineaTransporte } from '../modelo/linea-transporte';
import { Cuenta } from '../modelo/cuenta';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransporteService {
  lista: Observable<Transporte[]>;
  transporte: Observable<Transporte>;
  lineaTransporte: Observable<LineaTransporte>;
  cuenta: Observable<Cuenta>;


  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  readTransportePorId(idTransporte: string) {
    return (this.transporte = this.afs
      .doc<Transporte>('Transporte/' + idTransporte)
      .valueChanges());
  }




  async createTransporte(transporte: Transporte, cuenta: Cuenta) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(cuenta.correoElectronico, cuenta.password);
      // le pasa la id del cuenta creado
      transporte.idTransporte = result.user.uid;

      this.afs
        .collection<Transporte>('Transporte')
        .doc(transporte.idTransporte)
        .set(JSON.parse(JSON.stringify(transporte)));

      return true;
    } catch (error) {
      return false
    }
  }

  readAllTransporte() {
    return (this.lista = this.afs
      .collection<Transporte>('Transporte')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const idTransporte = a.payload.doc.id;
            return { idTransporte, ...data };
          })
        )
      ));
  }

  readAllByLineTransporte(ID_LINEA) {
    return (this.lista = this.afs
      .collection<Transporte>('Transporte', ref => ref.where('lineaTransporte', '==', ID_LINEA))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const idTransporte = a.payload.doc.id;
            return { idTransporte, ...data };
          })
        )
      ));
  }

  updateTransporte(transporte: Transporte) {
    this.afs.doc('Transporte/' + transporte.idTransporte).update(
      JSON.parse(
        JSON.stringify({
          estado: transporte.estado,
          lineaTransporte: transporte.lineaTransporte,
          nombreConductor: transporte.nombreConductor,
          patente: transporte.patente,
        })
      )
    );
  }

  deleteTransporte(idTransporte: string) {
    this.afs.doc('Transporte/' + idTransporte).delete();
  }
}
