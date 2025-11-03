import { Component, OnInit } from '@angular/core';
import { Panel } from '../../model/panel.model';
import { PanelesService } from '../../services/paneles.service';

@Component({
  selector: 'app-paneles',
  templateUrl: './paneles.component.html',
  styleUrls: ['./paneles.component.css']
})

export class PanelesComponent implements OnInit {
  constructor(private panelesService: PanelesService) { }

  ngOnInit(): void {
    this.panelesService.getPaneles().subscribe(
      (data) => {
        this.paneles = data;
        this.ordenarPaneles();
      },
      (error) => {
        console.error('Error al cargar los paneles', error);
      }
    );
  }

  isListView: boolean = true;
  showModal: boolean = false;
  paneles: Panel[] = [];
  selectedPanel: Panel | null = null; // Para almacenar el panel seleccionado
  marcas: any[] = [];
  origenes: any[] = [];

  toggleView() {
    this.isListView = !this.isListView;
  }

  openModal(panel: Panel) {
    this.selectedPanel = panel;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  };

  ordenarPaneles() {
    const activos = this.paneles.filter(p => p.activo).sort((a, b) => a.id_panel - b.id_panel);
    const inactivos = this.paneles.filter(p => !p.activo).sort((a, b) => a.id_panel - b.id_panel);
    this.paneles = [...activos, ...inactivos];
  }

  getMarcaNombre(id: number) {
    const marca = this.marcas.find(m => m.id_marca_panel === id);
    return marca ? marca.nombre_marca : '';
  }

  getOrigenNombre(id: number) {
    const origen = this.origenes.find(o => o.id_origen_panel === id);
    return origen ? origen.nombre_origen : '';
  }
}