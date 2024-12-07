import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffService } from 'src/app/services/staff.service'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from 'src/app/responses/user/users.response';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.admin.component.html',
  styleUrls: ['./user.admin.component.scss']
})
export class UserAdminComponent implements OnInit {  
  users: UserResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];

  constructor(
    private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log('Calling getAllUsers with params:', this.keyword, this.currentPage, this.itemsPerPage);
    this.getAllUsers(this.keyword, this.currentPage, this.itemsPerPage); 
  }

  getAllUsers(keyword: string, page: number, limit: number) {
    console.log('Calling getAllUsers with params:', keyword, page, limit);  // Log các tham số
    this.staffService.getAllUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        console.log('API response:', response);  // Log dữ liệu trả về từ API
        this.users = response.content.map((user: any) => {
          if (user.date_of_birth) {
            const dateOfBirth = new Date(user.date_of_birth); 
            user.date_of_birth = `${dateOfBirth.getDate()}/${dateOfBirth.getMonth() + 1}/${dateOfBirth.getFullYear()}`;
          }
          return user;
        });
  
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {},
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  
  

  onPageChange(page: number) {
    debugger;
    this.currentPage = page-1;
    this.getAllUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
        .map((_, index) => startPage + index);
  }
  deleteUser(id: number) {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.staffService.deleteUser(id).subscribe({
        next: (response: any) => {
          location.reload(); // Reload lại trang sau khi xóa thành công
        },
        complete: () => {},
        error: (error: any) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  viewDetails(user: UserResponse) {
    this.router.navigate(['/admin/users', user.id]);
  }

}
