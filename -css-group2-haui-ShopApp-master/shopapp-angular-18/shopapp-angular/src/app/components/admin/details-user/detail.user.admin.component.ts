import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { UserResponse } from 'src/app/responses/user/users.response';
import { UserDTO } from 'src/app/dtos/user/user.dto'; 
import { StaffService } from 'src/app/services/staff.service';
import { Role } from 'src/app/models/role';
@Component({
  selector: 'app-detail-user-admin',
  templateUrl: './detail.user.admin.component.html'
//   styleUrls: ['./detail.user.admin.component.scss']
})

export class DetailUserAdminComponent implements OnInit {
  userId: number = 0;
  userResponse: UserResponse = {
    id: 0,
    fullname: '',
    phone_number: '',
    address: '',
    password: '',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    date_of_birth: new Date(),
    facebook_account_id: 0,
    google_account_id: 0,
    role: { id: 0, name: '' }
  };

  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.staffService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        this.userResponse.id = response.id;
        this.userResponse.fullname = response.fullname;
        this.userResponse.phone_number = response.phone_number;
        this.userResponse.address = response.address;
        this.userResponse.password = response.password;
        if (response.created_at) {
          this.userResponse.created_at = new Date(response.created_at);
        }
        if (response.updated_at) {
          this.userResponse.updated_at = new Date(response.updated_at);
        }
        this.userResponse.is_active = response.is_active === '1' ? true : response.is_active === '0' ? false : response.is_active;
        if (response.date_of_birth) {
          this.userResponse.date_of_birth = new Date(response.date_of_birth);
        }
        this.userResponse.facebook_account_id = response.facebook_account_id;
        this.userResponse.google_account_id = response.google_account_id;

        this.userResponse.role = response.role;
      },
      complete: () => {
        console.log('User details fetched successfully');
      },
      error: (error: any) => {
        console.error('Error fetching user detail:', error);
      }
    });
  }

  saveUser(): void {
    this.staffService.updateUser(this.userId, new UserDTO(this.userResponse)).subscribe({
      next: (response: any) => {
        console.log('User updated successfully:', response);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
        console.error('Error details:', error.error);
      }
    });
  }
}
