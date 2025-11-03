import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente.model';
import { PanelesService } from 'src/app/services/paneles.service';
import { Panel } from '../../model/panel.model';
import { InversoresService } from 'src/app/services/inversores.service';
import { Inversor } from '../../model/inversor.model';
import { EstructurasService } from 'src/app/services/estructuras.service';
import { Estructura } from '../../model/estructura.model';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  clients: Cliente[] = [];
  filteredClients: Cliente[] = [];
  selectedClient: Cliente | null = null;
  searchValue: string = '';
  paneles: Panel[] = [];
  filteredPaneles: Panel[] = [];
  selectedPanel: Panel | null = null;
  panelSearchValue: string = '';
  inversores: Inversor[] = [];
  filteredInversores: Inversor[] = [];
  selectedInversor: Inversor | null = null;
  inversorSearchValue: string = '';
  estructuras: Estructura[] = [];
  filteredEstructuras: Estructura[] = [];
  selectedEstructura: Estructura | null = null;
  estructuraSearchValue: string = '';

  constructor(
    private clientesService: ClientesService,
    private panelesService: PanelesService,
    private inversoresService: InversoresService,
    private estructurasService: EstructurasService
  ) {}

  // Cargar los clientes al inicializar el componente
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        this.clients = clientes.filter(c => c.activo);
        this.filteredClients = [];
      },
      error: () => {
        this.clients = [];
        this.filteredClients = [];
      }
    });
    this.panelesService.getPaneles().subscribe({
      next: (paneles) => {
        this.paneles = paneles.filter((p: Panel) => p.activo);
        this.filteredPaneles = [];
      },
      error: () => {
        this.paneles = [];
        this.filteredPaneles = [];
      }
    });
    this.inversoresService.getInversores().subscribe({
      next: (inversores) => {
        this.inversores = inversores.filter((i: Inversor) => i.activo);
        this.filteredInversores = [];
      },
      error: () => {
        this.inversores = [];
        this.filteredInversores = [];
      }
    });
    this.estructurasService.getEstructuras().subscribe({
      next: (estructuras) => {
        this.estructuras = estructuras.filter((e: Estructura) => e.activo);
        this.filteredEstructuras = [];
      },
      error: () => {
        this.estructuras = [];
        this.filteredEstructuras = [];
      }
    });
  }

  // Filtrar inversores en tiempo real
  onInversorSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement?.value.toLowerCase() || '';
    this.inversorSearchValue = inputElement.value;
    if (query.length === 0) {
      this.filteredInversores = [];
      return;
    }
    this.filteredInversores = this.inversores.filter(inversor =>
      inversor.nombre.toLowerCase().includes(query) ||
      (inversor.marca?.toLowerCase().includes(query) ?? false)
    );
  }

  // Seleccionar un inversor del buscador
  selectInversor(inversor: Inversor): void {
    this.selectedInversor = inversor;
    this.filteredInversores = [];
    this.inversorSearchValue = '';
    const input = document.querySelector('.input-busqueda-inversor') as HTMLInputElement;
    if (input) input.value = '';
  }

  // Filtrar estructuras en tiempo real
  onEstructuraSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement?.value.toLowerCase() || '';
    this.estructuraSearchValue = inputElement.value;
    if (query.length === 0) {
      this.filteredEstructuras = [];
      return;
    }
    this.filteredEstructuras = this.estructuras.filter(estructura =>
      estructura.nombre.toLowerCase().includes(query) ||
      (estructura.marca?.toLowerCase().includes(query) ?? false)
    );
  }

  // Seleccionar una estructura del buscador
  selectEstructura(estructura: Estructura): void {
    this.selectedEstructura = estructura;
    this.filteredEstructuras = [];
    this.estructuraSearchValue = '';
    const input = document.querySelector('.input-busqueda-estructura') as HTMLInputElement;
    if (input) input.value = '';
  }

  // Filtrar paneles en tiempo real
  onPanelSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement?.value.toLowerCase() || '';
    this.panelSearchValue = inputElement.value;
    if (query.length === 0) {
      this.filteredPaneles = [];
      return;
    }
    this.filteredPaneles = this.paneles.filter(panel =>
      panel.nombre.toLowerCase().includes(query) ||
      (panel.marca?.toLowerCase().includes(query) ?? false)
    );
  }

  // Seleccionar un panel del buscador
  selectPanel(panel: Panel): void {
    this.selectedPanel = panel;
    this.filteredPaneles = [];
    this.panelSearchValue = '';
    // Limpiar el input de búsqueda visualmente
    const input = document.querySelector('.input-busqueda-panel') as HTMLInputElement;
    if (input) input.value = '';
  }

  // Filtrar clientes en tiempo real
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement?.value.toLowerCase() || '';
    this.searchValue = inputElement.value;
    if (query.length === 0) {
      this.filteredClients = [];
      return;
    }
    this.filteredClients = this.clients.filter(client =>
      client.nombre.toLowerCase().includes(query) ||
      client.apellido_paterno.toLowerCase().includes(query) ||
      client.apellido_materno.toLowerCase().includes(query)
    );
  }
  

  // Seleccionar un cliente del buscador
  selectClient(client: Cliente): void {
    this.selectedClient = client;
    this.filteredClients = [];
    this.searchValue = '';
    // Limpiar el input de búsqueda visualmente
    const input = document.querySelector('.input-busqueda') as HTMLInputElement;
    if (input) input.value = '';
  }
}
