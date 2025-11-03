import { Component, OnInit } from '@angular/core';
import { Inversor } from '../../model/inversor.model';
import { InversoresService } from '../../services/inversores.service';

@Component({
  selector: 'app-inversores',
  templateUrl: './inversores.component.html',
  styleUrls: ['./inversores.component.css']
})

export class InversoresComponent implements OnInit {
  constructor(private inversoresService: InversoresService) { }

  ngOnInit(): void {
    this.inversoresService.getInversores().subscribe
      (data => {
        this.inversores = data;
        this.ordenarinversores();
      },
        (error) => {
          console.error('Error al cargar los inversores', error);
        }
      );
  }

  isListView: boolean = true;
  showModal: boolean = false;
  inversores: Inversor[] = [];
  selectedInversor: Inversor | null = null;
  marcas: any[] = [];
  origenes: any[] = [];

  toggleView() {
    this.isListView = !this.isListView;
  }

  openModal(inversor: Inversor) {
    this.selectedInversor = inversor;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ordenarinversores() {
    const activos = this.inversores.filter(i => i.activo).sort((a, b) => a.id_inversor - b.id_inversor);
    const inactivos = this.inversores.filter(i => !i.activo).sort((a, b) => a.id_inversor - b.id_inversor);
    this.inversores = [...activos, ...inactivos];
  }

  getMarcaNombre(id: number) {
    const marca = this.marcas.find(m => m.id_marca_inversor === id);
    return marca ? marca.nombre_marca : '';
  }

  getOrigenNombre(id: number) {
    const origen = this.origenes.find(o => o.id_origen_inversor === id);
    return origen ? origen.nombre_origen : '';
  }
}
