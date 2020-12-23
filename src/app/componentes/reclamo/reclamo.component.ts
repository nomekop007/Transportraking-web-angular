import { Component, OnInit } from '@angular/core';
import { Reclamo } from 'src/app/modelo/reclamo';
import { Transporte } from 'src/app/modelo/transporte';
import { Usuario } from 'src/app/modelo/usuario';
import { TransporteService } from 'src/app/servicios/transporte.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ReclamoService } from '../../servicios/reclamo.service';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.css']
})
export class ReclamoComponent implements OnInit {

  reclamos: Reclamo[] = [];

  constructor
    (private reclamoService: ReclamoService,
      private transporteService: TransporteService,
      private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarReclamos();
  }

  cargarReclamos() {
    this.reclamoService.getReclamos().subscribe((reclamos: Reclamo[]) => {
      reclamos.map((item: Reclamo) => {
        this.transporteService.readTransportePorId(item.idTransporte).subscribe((transporte: Transporte) => {
          item.idTransporte = transporte.patente;
          item.idReclamo = transporte.nombreConductor;
        })
        this.usuarioService.readFindById(item.idUsuario).subscribe((usuario: Usuario) => {
          item.idUsuario = usuario.nombreUsuario;
        })
      })
      this.reclamos = reclamos;
    })
  }

}
