import { Role } from "src/app/models/role";

export interface UserResponse {
    id: number; 
    fullname: string; 
    phone_number: string;
    address: string; 
    is_active: boolean; 
    password: string; 
    created_at: Date; 
    updated_at: Date; 
    date_of_birth: Date | null;
    facebook_account_id: number;
    google_account_id: number;  
    role: Role;
  }
  