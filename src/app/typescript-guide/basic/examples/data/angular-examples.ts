import { Example } from './types';

export const angularExamples: Example[] = [
  {
    id: 'angular-basic-1',
    title: 'Componente con Signals',
    description: 'Implementación de un componente Angular usando Signals para estado reactivo',
    code: `import { Component, computed, signal } from '@angular/core';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  template: \`
    <div class="max-w-md mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Lista de Tareas</h2>
      
      <div class="flex gap-2 mb-4">
        <input
          #newTodo
          type="text"
          class="flex-1 px-3 py-2 border rounded"
          placeholder="Nueva tarea..."
          (keyup.enter)="addTodo(newTodo.value); newTodo.value = ''"
        />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          (click)="addTodo(newTodo.value); newTodo.value = ''"
        >
          Agregar
        </button>
      </div>

      <div class="flex gap-2 mb-4">
        <button
          *ngFor="let filter of filters()"
          (click)="setFilter(filter)"
          [class.bg-blue-500]="currentFilter() === filter"
          [class.text-white]="currentFilter() === filter"
          class="px-3 py-1 rounded border"
        >
          {{ filter }}
        </button>
      </div>

      <ul class="space-y-2">
        @for (todo of filteredTodos(); track todo.id) {
          <li class="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)"
            />
            <span [class.line-through]="todo.completed">
              {{ todo.text }}
            </span>
            <button
              class="ml-auto text-red-500"
              (click)="removeTodo(todo.id)"
            >
              Eliminar
            </button>
          </li>
        }
      </ul>

      <div class="mt-4 text-sm text-gray-600">
        {{ completedCount() }} de {{ todos().length }} completadas
      </div>
    </div>
  \`
})
export class TodoListComponent {
  private todos = signal<TodoItem[]>([]);
  private filters = signal(['Todas', 'Activas', 'Completadas']);
  private currentFilter = signal('Todas');

  protected filteredTodos = computed(() => {
    const filter = this.currentFilter();
    return this.todos().filter(todo => {
      if (filter === 'Activas') return !todo.completed;
      if (filter === 'Completadas') return todo.completed;
      return true;
    });
  });

  protected completedCount = computed(() => 
    this.todos().filter(todo => todo.completed).length
  );

  protected addTodo(text: string) {
    if (!text.trim()) return;
    
    this.todos.update(todos => [
      ...todos,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false
      }
    ]);
  }

  protected toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  protected removeTodo(id: number) {
    this.todos.update(todos =>
      todos.filter(todo => todo.id !== id)
    );
  }

  protected setFilter(filter: string) {
    this.currentFilter.set(filter);
  }
}`,
    explanation: 'Este ejemplo muestra cómo implementar un componente de lista de tareas usando Signals de Angular para manejar el estado de forma reactiva.',
    realWorldUsage: 'Ideal para aplicaciones que requieren estado reactivo y actualizaciones en tiempo real de la UI.',
    category: 'basic',
    tags: ['angular', 'signals', 'components', 'state'],
    framework: 'angular'
  },
  {
    id: 'angular-intermediate-1',
    title: 'Servicio con Estado Global',
    description: 'Implementación de un servicio de carrito de compras con estado global usando Signals',
    code: `import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CartStore {
  private state = signal<CartState>({
    items: [],
    isLoading: false,
    error: null
  });

  // Selectores
  readonly items = computed(() => this.state().items);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);
  readonly total = computed(() => 
    this.items().reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    )
  );
  readonly itemCount = computed(() => 
    this.items().reduce((sum, item) => 
      sum + item.quantity, 0
    )
  );

  constructor() {
    // Cargar estado inicial del localStorage
    this.loadFromStorage();

    // Persistir cambios en localStorage
    effect(() => {
      const items = this.items();
      localStorage.setItem('cart', JSON.stringify(items));
    }, { allowSignalWrites: true });
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        this.state.update(state => ({
          ...state,
          items
        }));
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  }

  addItem(item: Omit<CartItem, 'quantity'>) {
    this.state.update(state => {
      const existingItem = state.items.find(i => i.id === item.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...item, quantity: 1 }]
      };
    });
  }

  removeItem(id: number) {
    this.state.update(state => ({
      ...state,
      items: state.items.filter(item => item.id !== id)
    }));
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity < 0) return;

    this.state.update(state => ({
      ...state,
      items: state.items.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    }));
  }

  async checkout() {
    this.state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.state.update(state => ({
        items: [],
        isLoading: false,
        error: null
      }));
    } catch (error) {
      this.state.update(state => ({
        ...state,
        isLoading: false,
        error: 'Error al procesar el checkout'
      }));
    }
  }
}`,
    explanation: 'Este ejemplo muestra cómo implementar un servicio de carrito de compras con estado global usando Signals, incluyendo persistencia en localStorage y manejo de errores.',
    realWorldUsage: 'Perfecto para aplicaciones de comercio electrónico que necesitan mantener el estado del carrito entre navegaciones y sesiones.',
    category: 'intermediate',
    tags: ['angular', 'signals', 'state-management', 'services'],
    framework: 'angular'
  }
]; 