import { Component, OnInit } from '@angular/core';
import { Transporte } from 'src/app/modelo/transporte';
import { Cuenta } from 'src/app/modelo/cuenta';

import { LineaTransporte } from 'src/app/modelo/linea-transporte';
import { LineaTransporteService } from 'src/app/servicios/linea-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransporteService } from 'src/app/servicios/transporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transporte-form',
  templateUrl: './transporte-form.component.html',
  styleUrls: ['./transporte-form.component.css'],
})
export class TransporteFormComponent implements OnInit {
  editarTransporte: boolean;


  transporte: Transporte = new Transporte();
  cuenta: Cuenta = new Cuenta();
  listaLineaTransportes: LineaTransporte[];

  constructor(
    private servicioLineaTransporte: LineaTransporteService,
    private servicioTransporte: TransporteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarTransporte();

    this.servicioLineaTransporte
      .readAllLineaTransporte()
      .subscribe((resultado) => {
        this.listaLineaTransportes = resultado;

      });
  }

  actualizarTransporte() {
    this.servicioTransporte.updateTransporte(this.transporte);
    Swal.fire({
      icon: 'success',
      title: 'Actualizado',
      text: 'Tranasporte actualizado',
    });
    this.router.navigate(['/transporte']);
  }

  async agregarTransporte() {

    console.log(this.cuenta.correoElectronico)
    if (this.cuenta.correoElectronico == "" || this.cuenta.password == "") {
      Swal.fire({
        icon: 'error',
        title: 'faltan datos',
        text: 'falta correo y contraseña',
      });
      return;
    }

    const response = await this.servicioTransporte.createTransporte(this.transporte, this.cuenta);
    console.log(response);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Agregado',
        text: 'Transporte agregado',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'algo paso',
        text: 'no se guardo el Transporte ',
      });
    }

    this.router.navigate(['/transporte']);
  }

  cargarTransporte() {
    this.activatedRoute.params.subscribe((dato) => {
      let idTransporte = dato['idTransporte'];
      if (idTransporte) {

        this.servicioTransporte.readTransportePorId(idTransporte).subscribe((resultado) => {
          this.transporte = resultado;
          if (this.transporte) {
            this.transporte.idTransporte = idTransporte;
            this.editarTransporte = true;
          } else {
            this.editarTransporte = false;
          }
        });
      }
    });
  }

  compararLineaTransporte(o1: LineaTransporte, o2: LineaTransporte) {
    return o1 == null || o2 == null ? false : o1 == o2;
  }
}
