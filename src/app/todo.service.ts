import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:7001'; // URL พื้นฐานของ API
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  // ตั้งค่า Token หลังจากการเข้าสู่ระบบสำเร็จ
  setToken(token: string): void {
    this.token = token;
  }

  // สร้างงานใหม่ (POST)
  createTodo(dailyInfo: string): Observable<any> {
    const url = `${this.apiUrl}/create-list`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { daily_info: dailyInfo }, { headers });
  }

  // อัปเดตงาน (PATCH)
  updateTodo(orderID: string, dailyInfo: string): Observable<any> {
    const url = `${this.apiUrl}/updateUp`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.patch(url, { orderID, daily_info: dailyInfo }, { headers });
  }

  // ลบงาน (DELETE)
  deleteTodo(orderID: string): Observable<any> {
    const url = `${this.apiUrl}/delete`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    return this.http.delete(url, { headers, body: { orderID } });
  }

  // ดึงรายการที่เสร็จสิ้นการเข้าสู่ระบบ
  getLoginFinishedList(): Observable<any> {
    const url = `${this.apiUrl}/auth/loginFinished/showlist`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    return this.http.get(url, { headers });
  }
}
