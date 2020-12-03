import { Component, OnInit } from '@angular/core';
import { CoordenadaService } from '../../servicios/coordenada.service';
import { TransporteService } from '../../servicios/transporte.service';
import { Transporte } from '../../modelo/transporte';
import { LineaTransporte } from '../../modelo/linea-transporte'
import { LineaTransporteService } from 'src/app/servicios/linea-transporte.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  arrayCoordenadas: any[];
  icono: any;
  transporte: Transporte = new Transporte();
  lineaTransporte: LineaTransporte = new LineaTransporte();
  windowMaker: boolean;

  constructor(
    private coordenadaService: CoordenadaService,
    private transporteService: TransporteService,
    private lineaTransporteService: LineaTransporteService
  ) {
    this.windowMaker = true;
    this.lat = -35.4276878;
    this.lng = -71.6442594;
    this.zoom = 14;
    this.mapTypeId = 'hybrid';
    this.icono = {
      url: 'assets/images/icono.png',
      scaledSize: {
        width: 60,
        height: 60
      }
    };
  }


  getCoordenadas() {
    this.coordenadaService.getCoordenadas().subscribe(coord => {
      this.arrayCoordenadas = coord;
      console.log(this.arrayCoordenadas);
    });
  }


  getTransporte(ID_TRANSPORTE: string) {
    this.windowMaker = false;
    this.transporteService.readTransportePorId(ID_TRANSPORTE).subscribe((transporte) => {
      this.transporte = transporte;
      this.lineaTransporteService.readLineaTransportePorId(this.transporte.lineaTransporte).subscribe((lineaTransporte) => {
        this.lineaTransporte = lineaTransporte;
        console.log(lineaTransporte)
        this.windowMaker = true;
      });
    });
  }



  ngOnInit(): void {
    this.getCoordenadas();
  }
}
