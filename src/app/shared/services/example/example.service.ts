import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TodoApiItem {
  orderID: string;
  dairy_info: string;
  check: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  private readonly baseUrl = 'http://localhost:7001';

  constructor(private _httpClient: HttpClient) {}

  // ฟังก์ชันดึงข้อมูล loginFinished (GET)
  getLoginFinished(token: string): Observable<TodoApiItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.get<TodoApiItem[]>(
      `${this.baseUrl}/auth/loginFinished/showlist`,
      { headers }
    );
  }

  // ฟังก์ชันเพิ่มงานใหม่ (POST) 
  addTask(dailyInfo: string, token: string): Observable<TodoApiItem> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this._httpClient.post<TodoApiItem>(
      `${this.baseUrl}/create-list`,
      { daily_info: dailyInfo },
      { headers }
    );
  }

  // ฟังก์ชันอัปเดตงาน (PATCH) 
  updateTask(orderID: string, dairyInfo: string, check: boolean, token: string): Observable<TodoApiItem> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.patch<TodoApiItem>(
      `${this.baseUrl}/updateUp`,
      { orderID, dairy_info: dairyInfo, check },
      { headers }
    );
  }

  // ฟังก์ชันลบงาน (DELETE) 
  deleteTask(orderID: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.delete<void>(
      `${this.baseUrl}/delete?orderID=${orderID}`,
      { headers }
    );
  }

}

