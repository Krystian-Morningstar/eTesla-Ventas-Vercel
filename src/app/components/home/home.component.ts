import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  precioDolar: string = 'Cargando...';
  fechaActualizacion: string = '';

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.PrecioDolar();
  }

  PrecioDolar(): void {
    this.homeService.getPrecioDolar().subscribe(
      (data) => {
        if (data && data.rates && data.rates.MXN) {
          this.precioDolar = data.rates.MXN.toFixed(2);
          this.fechaActualizacion = new Date().toLocaleString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        } else {
          this.precioDolar = 'No disponible';
          this.fechaActualizacion = 'No disponible';
        }
      },
      (error) => {
        console.error('Error al obtener el precio del dólar:', error);
        this.precioDolar = 'No disponible';
        this.fechaActualizacion = 'No disponible';
      }
    );
  }
}