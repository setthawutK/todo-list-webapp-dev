import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ExampleService, TodoApiItem } from '../../shared/services/example/example.service';
import { Router } from '@angular/router';

type Todo = { id: string; text: string; done: boolean; editing?: boolean };

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  draft = signal('');
  items = signal<Todo[]>([]);
  editDraft: Record<string, string> = {};
  token: string;
  loading = signal(false);
  error = signal<string | null>(null);

  // Pagination
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

  constructor(private exampleService: ExampleService, private router: Router) {
    this.token = localStorage.getItem('authToken') || '';
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.loadTodos();
    }
  }

  // โหลดข้อมูลจาก API
  loadTodos() {
    this.loading.set(true);
    this.error.set(null);
    this.exampleService.getLoginFinished(this.token).subscribe({
      next: (response: TodoApiItem[]) => {
        const todos: Todo[] = response.map((item) => ({
          id: item.orderID,
          text: item.dairy_info,
          done: item.check,
          editing: false,
        }));
        this.items.set(todos);
        this.loading.set(false);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        this.error.set('Failed to load tasks. Please try again.');
        this.loading.set(false);
      },
    });
  }

  // เพิ่มงานใหม่
  add() {
    const text = this.draft().trim();
    if (!text) return;

    this.loading.set(true);
    this.error.set(null);
    this.exampleService.addTask(text, this.token).subscribe({
      next: (response: TodoApiItem) => {
        this.items.update((list) => [
          { id: response.orderID, text: response.dairy_info, done: response.check, editing: false },
          ...list,
        ]);
        this.draft.set('');
        this.page.set(1);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to add task. Please try again.');
        this.loading.set(false);
      },
    });
  }

  // สลับสถานะ done/undone
  toggle(id: string) {
    const item = this.items().find((t) => t.id === id);
    if (!item) return;

    this.loading.set(true);
    this.error.set(null);
    this.exampleService.updateTask(id, item.text, !item.done, this.token).subscribe({
      next: () => {
        this.items.update((list) =>
          list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to update task. Please try again.');
        this.loading.set(false);
      },
    });
  }

  // ลบงาน
  remove(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.exampleService.deleteTask(id, this.token).subscribe({
      next: () => {
        this.items.update((list) => list.filter((t) => t.id !== id));
        if (this.pagedItems().length === 0 && this.page() > 1) {
          this.page.set(this.page() - 1);
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to delete task. Please try again.');
        this.loading.set(false);
      },
    });
  }

  // เริ่มแก้ไข
  startEdit(id: string) {
    this.items.update((list) =>
      list.map((t) => (t.id === id ? { ...t, editing: true } : t))
    );
    const item = this.items().find((t) => t.id === id);
    if (item) this.editDraft[id] = item.text;
  }

  // บันทึกการแก้ไข
  saveEdit(id: string) {
    const text = (this.editDraft[id] ?? '').trim();
    if (!text) return;

    this.loading.set(true);
    this.error.set(null);
    const current = this.items().find((t) => t.id === id);
    if (!current) return;

    this.exampleService.updateTask(id, text, current.done, this.token).subscribe({
      next: () => {
        this.items.update((list) =>
          list.map((t) => (t.id === id ? { ...t, text, editing: false } : t))
        );
        delete this.editDraft[id];
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to save task. Please try again.');
        this.loading.set(false);
      },
    });
  }

  // ยกเลิกการแก้ไข
  cancelEdit(id: string) {
    this.items.update((list) =>
      list.map((t) => (t.id === id ? { ...t, editing: false } : t))
    );
    delete this.editDraft[id];
  }

  // Pagination controls
  go(p: number) {
    if (p >= 1 && p <= this.totalPages()) this.page.set(p);
  }
  prev() { this.go(this.page() - 1); }
  next() { this.go(this.page() + 1); }

  // Counters
  get completed() { return this.items().filter((t) => t.done).length; }
  get uncompleted() { return this.items().filter((t) => !t.done).length; }
}
