type ToastType = 'success' | 'error' | 'delete' | 'warning';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  isFormVisible = false;
  showToast = false;
  isSuccess = false;
  toastMessage = '';
  toastType: ToastType = 'success';
  clients: Cliente[] = [];
  editingClienteId: number | null = null;
  newCliente: Cliente = this.initCliente();

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.refreshClientes();
  }

  initCliente(): Cliente {
    return {
      id_cliente: 0,
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono: '',
      correo: '',
      direccion: '',
      codigo_postal: '',
      colonia: '',
      ciudad: '',
      estado: '',
      activo: true
    };
  }

  refreshClientes() {
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        this.clients = this.ordenarClientes(clientes);
      },
      error: () => {
        this.showToastMessage('Error al cargar los clientes.', 'error');
      }
    });
  }

  ordenarClientes(clientes: Cliente[]): Cliente[] {
    const activos = clientes.filter(c => c.activo).sort((a, b) => a.id_cliente - b.id_cliente);
    const inactivos = clientes.filter(c => !c.activo).sort((a, b) => a.id_cliente - b.id_cliente);
    return [...activos, ...inactivos];
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.cancelarEdicion();
    }
  }

  submitCliente(form: any) {
    if (!form.valid) {
      this.showToastMessage('Por favor, complete todos los campos obligatorios.', 'warning');
      return;
    }
    const payload = { ...this.newCliente };
    if (this.editingClienteId) {
      // Edición
      this.clientesService.actualizarCliente(this.editingClienteId, payload).subscribe({
        next: (clienteActualizado) => {
          this.refreshClientes();
          this.cancelarEdicion();
          this.toggleForm();
          this.showToastMessage('Cliente actualizado correctamente.', 'success');
        },
        error: () => {
          this.showToastMessage('Error al actualizar el cliente.', 'error');
        }
      });
    } else {
      // Creación
      this.clientesService.crearCliente(payload).subscribe({
        next: (clienteCreado) => {
          this.refreshClientes();
          this.cancelarEdicion();
          this.toggleForm();
          this.showToastMessage('Cliente creado correctamente.', 'success');
        },
        error: (error) => {
          this.showToastMessage('Error al crear el cliente.', 'error');
        }
      });
    }
  }

  editClient(cliente: Cliente) {
    this.newCliente = { ...cliente };
    this.editingClienteId = cliente.id_cliente;
    this.isFormVisible = true;
  }

  deleteClient(cliente: Cliente) {
    if (cliente.id_cliente) {
      this.clientesService.SoftDeleteCliente(cliente.id_cliente).subscribe({
        next: () => {
          cliente.activo = false;
          this.refreshClientes();
          this.showToastMessage('Cliente desactivado correctamente.', 'delete');
        },
        error: () => {
          this.showToastMessage('Error al eliminar el cliente.', 'warning');
        }
      });
    }
  }

  deactivateClient(cliente: Cliente) {
    this.deleteClient(cliente);
  }

  reactivarCliente(cliente: Cliente) {
    if (cliente.id_cliente) {
      this.clientesService.reactivarCliente(cliente.id_cliente).subscribe({
        next: () => {
          cliente.activo = true;
          this.refreshClientes();
          this.showToastMessage('Cliente reactivado correctamente.', 'success');
        },
        error: () => {
          this.showToastMessage('Error al reactivar el cliente.', 'warning');
        }
      });
    }
  }

  showToastMessage(message: string, type: ToastType) {
    this.toastMessage = message;
    this.toastType = type;
    this.isSuccess = type === 'success';
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  cancelarEdicion() {
    this.editingClienteId = null;
    this.newCliente = this.initCliente();
  }
}
