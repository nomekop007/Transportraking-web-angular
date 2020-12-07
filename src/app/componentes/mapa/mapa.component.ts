import { Component, OnInit } from '@angular/core';
import { CoordenadaService } from '../../servicios/coordenada.service';
import { TransporteService } from '../../servicios/transporte.service';
import { Transporte } from '../../modelo/transporte';
import { LineaTransporte } from '../../modelo/linea-transporte';
import { Coordenada } from '../../modelo/coordenada';
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
  arrayCoordenadas: Coordenada[];
  icono: any;
  transporte: Transporte = new Transporte();
  lineaTransporte: LineaTransporte = new LineaTransporte();
  loadingMaker: boolean;
  loadingLines: boolean;
  arrayLineas: LineaTransporte[];
  fileKML: any;
  lineaSeleccionada: string;



  constructor(
    private coordenadaService: CoordenadaService,
    private transporteService: TransporteService,
    private lineaTransporteService: LineaTransporteService
  ) {
    this.loadingMaker = true;
    this.loadingLines = false;

    this.lat = -35.4276878;
    this.lng = -71.6442594;
    this.zoom = 14;
    this.mapTypeId = 'roadmap';
    this.icono = {
      url: 'assets/images/icono.png',
      scaledSize: {
        width: 60,
        height: 60
      }
    };
  }


  getLineasTransportes() {
    this.lineaTransporteService.readAllLineaTransporte().subscribe(lines => {
      this.arrayLineas = lines;
    });
  }

  getCoordenadas() {
    this.coordenadaService.getCoordenadas().subscribe(coord => {
      this.arrayCoordenadas = coord;
    });
  }


  getTransporte(ID_TRANSPORTE: string) {
    this.loadingMaker = false;
    this.transporteService.readTransportePorId(ID_TRANSPORTE).subscribe((transporte) => {
      this.transporte = transporte;
      this.lineaTransporteService.readLineaTransportePorId(this.transporte.lineaTransporte).subscribe((lineaTransporte) => {
        this.lineaTransporte = lineaTransporte;
        this.loadingMaker = true;
      });
    });
  }


  getRecorridoLinea(ID_LINEA: string) {
    this.loadingLines = true;
    if (ID_LINEA) {
      this.lineaTransporteService.buscarRecorridoLineaTransporte(ID_LINEA).subscribe((file) => {
        this.fileKML = file;
        this.loadingLines = false;
        this.lineaTransporteService.readLineaTransportePorId(ID_LINEA).subscribe((linea) => {
          this.lineaSeleccionada = linea.nombreLinea;
        });
      });
    } else {
      this.fileKML = null;
      this.loadingLines = false;
      this.lineaSeleccionada = null;
    }

  }


  ngOnInit(): void {
    this.getCoordenadas();
    this.getLineasTransportes();
  }
}
