import { Component, OnInit } from '@angular/core';
import { CoordenadaService } from '../../servicios/coordenada.service'
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

  constructor(private coordenadaService: CoordenadaService) {
    this.lat = -35.4276878;
    this.lng = -71.6442594;
    this.zoom = 14;
    this.mapTypeId = "hybrid";
  }


  getCoordenadas() {
    this.coordenadaService.getCoordenadas().subscribe(coord => {
      this.arrayCoordenadas = coord;
      console.log(this.arrayCoordenadas);
    })
  }

  ngOnInit(): void {
    this.getCoordenadas()
  }
}
