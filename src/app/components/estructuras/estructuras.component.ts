import { Component, OnInit } from '@angular/core';
import { EstructurasService } from '../../services/estructuras.service';
import { Estructura } from '../../model/estructura.model';

@Component({
  selector: 'app-estructuras',
  templateUrl: './estructuras.component.html',
  styleUrls: ['./estructuras.component.css']
})

export class EstructurasComponent implements OnInit {
  constructor(private estructurasService: EstructurasService) { }

  ngOnInit(): void {
    this.estructurasService.getEstructuras().subscribe(data => {
      this.estructuras = data;
      this.ordenarEstructuras();
    },
      (error) => {
        console.error('Error al cargar las estructuras', error);
      }
    );
  }

  isListView: boolean = true;
  showModal: boolean = false;
  estructuras: Estructura[] = [];
  selectedEstructura: Estructura | null = null;
  marcas: any[] = [];
  origenes: any[] = [];

  toggleView() {
    this.isListView = !this.isListView;
  }

  openModal(estructura: Estructura) {
    this.selectedEstructura = estructura;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getMarcaNombre(id: number): string {
    const marca = this.marcas.find(m => m.id_marca_estructura === id);
    return marca ? marca.nombre : '';
  }

  getOrigenNombre(id: number): string {
    const origen = this.origenes.find(o => o.id_origen_estructura === id);
    return origen ? origen.nombre : '';
  }

  ordenarEstructuras() {
    const activas = this.estructuras.filter(e => e.activo).sort((a, b) => a.id_estructura - b.id_estructura);
    const inactivas = this.estructuras.filter(e => !e.activo).sort((a, b) => a.id_estructura - b.id_estructura);
    this.estructuras = [...activas, ...inactivas];
  }
}
