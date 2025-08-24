import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { confirmDialogResModel } from '@components/dialogs/confirm-dialog/interfaces';
import { ThaiDatePipe } from '@shared/pipes';
import { ExampleService } from '@shared/services/example/example.service';
import { NotificationService } from '@shared/services/notification';
import {
  ActiveUserReqDto,
  DeleteUserReqDto,
  PageMetadata,
  PageOption,
  SearchUserCriteria,
  SearchUserOrder,
  SearchUserResDto,
} from '@shared/swagger/example/Api';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-example',
  imports: [CommonModule, TableModule, ThaiDatePipe, ButtonModule, ToggleButtonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class ExampleComponent implements OnInit {
  private readonly _dialogService: DialogService = inject(DialogService);
  private readonly _exampleService: ExampleService = inject(ExampleService);
  private readonly _notify: NotificationService = inject(NotificationService);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  users!: SearchUserResDto[];
  loading: boolean = true;

  // criteria
  criteria: SearchUserCriteria = { fullNameLike: '', birthDateEqual: '' };
  order: SearchUserOrder = { id: 'DESC', createAtDate: 'DESC' };
  pageOption: PageOption = { page: 1, pageSize: 10 };

  // page
  page!: PageMetadata;
  count: number = 0;

  constructor(private exampleService: ExampleService) {}

  ngOnInit() {
    this.getUsers();
    this.getUsersCount();
  }

  getUsers() {
    this._notify.startSpinner();
    const params = this.objToParams(true);
    this.loading = false;
    this.exampleService.getUsers(params).subscribe(res => {
      this.users = res.data!.content!;
      this.page = res.data!.page!;
      this._cdr.markForCheck();
      this._notify.stopSpinner();
    });
  }

  getUsersCount() {
    const params = this.objToParams(false);
    this.exampleService.getUsersCount(params).subscribe(res => {
      this.count = res.data!.total!;
      this._cdr.markForCheck();
    });
  }

  onUpdateActive(user: SearchUserResDto) {
    console.log(user.isActive);

    const body: ActiveUserReqDto = { isActive: user.isActive ? true : false };
    this.exampleService.activeUser(body, user.id!).subscribe(() => {
      this.getUsers();
      this._cdr.markForCheck();
    });
  }

  delete(id: number) {
    const body: DeleteUserReqDto = { isDeleted: true };

    this._dialogService
      .open(ConfirmDialogComponent, {
        width: '320px',
        focusOnShow: false,
        showHeader: false,
        styleClass: 'confirm-dialog',
        data: { header: 'ลบผู้ใช้งาน', content: `คุณต้องลบผู้ใช้งานใช่หรือไม่?`, actionLabel: 'ลบ', isDelete: true },
      })
      .onClose.pipe(
        switchMap((confirm: confirmDialogResModel) => {
          if (confirm) return this._exampleService.deleteUser(body, id);
          return EMPTY;
        }),
      )
      .subscribe(res => {
        if (res.status === 'SUCCESS') {
          this.getUsers();
          this.getUsersCount();
        }
        console.log(res);
      });
  }

  search() {
    console.log('search');
  }

  objToParams(isPage: boolean) {
    let params = new HttpParams();

    for (const key in this.criteria) {
      if (this.criteria.hasOwnProperty!(key)) {
        const value = this.criteria[key as keyof SearchUserCriteria];
        if (Array.isArray(value))
          value.forEach((item: string) => {
            params = params.append('criteria.' + key, item);
          });
        else params = params.append('criteria.' + key, value!);
      }
    }

    for (const key in this.order) {
      if (this.order.hasOwnProperty!(key)) {
        const value = this.order[key as keyof SearchUserOrder];
        if (Array.isArray(value))
          value.forEach((item: string) => {
            params = params.append('order.' + key, item);
          });
        else params = params.append('order.' + key, value!);
      }
    }

    if (isPage) {
      for (const key in this.pageOption) {
        if (this.pageOption.hasOwnProperty!(key)) {
          const value = this.pageOption[key as keyof PageOption];
          if (Array.isArray(value))
            value.forEach((item: string) => {
              params = params.append(key, item);
            });
          else params = params.append(key, value!);
        }
      }
    }

    return params;
  }
}
