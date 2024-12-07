import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDTO } from '../dtos/user/user.dto';  // DTO cho User
import { UserResponse } from '../responses/user/users.response';  // Đáp ứng dữ liệu User từ API

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private apiUrl = `${environment.apiBaseUrl}/staff`; // URL chính của API
  private apiGetAllUsers = `${environment.apiBaseUrl}/staff/get-staffs-by-keyword`; // API lấy tất cả user theo từ khóa tìm kiếm

  constructor(private http: HttpClient) {}

  // Phương thức tạo người dùng mới
  createUser(userData: UserDTO): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Phương thức lấy thông tin người dùng theo ID
  getUserById(userId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/staff/${userId}`;
    return this.http.get(url);
  }

  // Phương thức lấy tất cả người dùng với các tham số phân trang và tìm kiếm
  getAllUsers(keyword: string, page: number, limit: number): Observable<UserResponse[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(this.apiGetAllUsers, { params });
  }

  // Phương thức cập nhật thông tin người dùng
  updateUser(userId: number, userData: UserDTO): Observable<any> {
    const url = `${environment.apiBaseUrl}/staff/${userId}`;
    return this.http.put(url, userData);
  }

  // Phương thức xóa người dùng theo ID
  deleteUser(userId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/staff/${userId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
