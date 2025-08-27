import {
  ChangeDetectionStrategy,
  Component,
  computed,

  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';

type Todo = { id: string; text: string; done: boolean; editing?: boolean };
const STORAGE_KEY = 'todo-items';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  draft = '';
  items = signal<Todo[]>([]);
  editDraft: Record<string, string> = {};

  // pagination
  pageSize = signal(5);
  page = signal(1);
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.items().length / this.pageSize()))
  );
  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );
  pagedItems = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.items().slice(start, start + this.pageSize());
  });
  
  constructor() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.items.set(JSON.parse(raw));
      } catch {
        // ignore JSON parse error
      }
    }
    // eslint: no-empty -- ไม่ใช้ effect แล้ว
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    // if (this.page() > this.totalPages()) this.page.set(this.totalPages());
  }

  add() {
    const text = this.draft.trim();
    if (!text) return;
    this.items.update(list => [{ id: crypto.randomUUID(), text, done: false }, ...list]);
    this.draft = '';
    this.page.set(1);
  }

  toggle(id: string) {
    this.items.update(list =>
      list.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  remove(id: string) {
    this.items.update(list => list.filter(t => t.id !== id));
    if (this.pagedItems().length === 0 && this.page() > 1) this.page.set(this.page() - 1);
  }

  startEdit(id: string) {
    this.items.update(list =>
      list.map(t => (t.id === id ? { ...t, editing: true } : t))
    );
    const item = this.items().find(t => t.id === id);
    if (item) this.editDraft[id] = item.text;
  }

  saveEdit(id: string) {
    const text = (this.editDraft[id] ?? '').trim();
    if (!text) return;
    this.items.update(list =>
      list.map(t => (t.id === id ? { ...t, text, editing: false } : t))
    );
    delete this.editDraft[id];
  }

  cancelEdit(id: string) {
    this.items.update(list =>
      list.map(t => (t.id === id ? { ...t, editing: false } : t))
    );
    delete this.editDraft[id];
  }

  // pagination controls
  go(p: number) { if (p >= 1 && p <= this.totalPages()) this.page.set(p); }
  prev() { this.go(this.page() - 1); }
  next() { this.go(this.page() + 1); }

  // counters
  get completed() { return this.items().filter(t => t.done).length; }
  get uncompleted() { return this.items().filter(t => !t.done).length; }

}
