import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';

interface Todo {
  id: string;
  text: string;
  done: boolean;
  editing: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private readonly STORAGE_KEY = 'todo-items';

  // State
  draft = signal('');
  items = signal<Todo[]>([]);
  editDraft: Record<string, string> = {};

  // Pagination
  pageSize = signal(5);
  currentPage = signal(1);
  totalPages = computed(() => Math.max(1, Math.ceil(this.items().length / this.pageSize())));
  pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  pagedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });

  // Counters
  completed = computed(() => this.items().filter(t => t.done).length);
  uncompleted = computed(() => this.items().filter(t => !t.done).length);

  constructor() {
    this.loadFromStorage();
    this.setupStorageEffect();
  }

  // Todo Management
  addTodo(): void {
    const text = this.draft().trim();
    if (!text) return;

    this.items.update(items => [{
      id: crypto.randomUUID(),
      text,
      done: false,
      editing: false
    }, ...items]);
    
    this.draft.set('');
    this.currentPage.set(1);
  }

  toggleTodo(id: string): void {
    this.items.update(items =>
      items.map(item => 
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  removeTodo(id: string): void {
    this.items.update(items => items.filter(item => item.id !== id));
    if (this.pagedItems().length === 0 && this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  // Edit Management
  startEdit(id: string): void {
    this.items.update(items =>
      items.map(item =>
        item.id === id ? { ...item, editing: true } : item
      )
    );
    const item = this.items().find(item => item.id === id);
    if (item) this.editDraft[id] = item.text;
  }

  saveEdit(id: string): void {
    const text = (this.editDraft[id] ?? '').trim();
    if (!text) return;

    this.items.update(items =>
      items.map(item =>
        item.id === id ? { ...item, text, editing: false } : item
      )
    );
    delete this.editDraft[id];
  }

  cancelEdit(id: string): void {
    this.items.update(items =>
      items.map(item =>
        item.id === id ? { ...item, editing: false } : item
      )
    );
    delete this.editDraft[id];
  }

  // Pagination Controls
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  // Private Methods
  private loadFromStorage(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        this.items.set(JSON.parse(raw));
      } catch {
        console.error('Failed to parse stored todos');
      }
    }
  }

  private setupStorageEffect(): void {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
      if (this.currentPage() > this.totalPages()) {
        this.currentPage.set(this.totalPages());
      }
    });
  }
}