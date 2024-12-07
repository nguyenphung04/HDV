import { 
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsNumber, 
    IsOptional, 
    IsDate, 
    IsEmail, 
    IsInt, 
    Length 
  } from 'class-validator';
  
  export class UserDTO {
    @IsInt()
    id: number;
  
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    fullname: string;
  
    @IsPhoneNumber()
    @IsOptional()  // phone_number có thể optional
    @Length(10, 15)  // Chỉnh lại độ dài số điện thoại nếu cần
    phone_number: string;
  
    @IsString()
    @IsOptional()  // address có thể optional
    @Length(1, 200)
    address: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(6, 60)  // Đảm bảo password có độ dài phù hợp
    password: string;
  
    @IsDate()
    @IsOptional()  // created_at có thể optional khi tạo mới
    created_at?: Date;
  
    @IsDate()
    @IsOptional()  // updated_at có thể optional
    updated_at?: Date;
  
    @IsOptional()
    @IsInt()
    is_active: number;
  
    @IsOptional()
    @IsDate()
    date_of_birth?: Date;
  
    @IsOptional()
    @IsInt()
    facebook_account_id: number;
  
    @IsOptional()
    @IsInt()
    google_account_id: number;
  
    @IsOptional()
    @IsInt()
    role_id: number;
  
    constructor(data: any) {
      this.id = data.id;
      this.fullname = data.fullname;
      this.phone_number = data.phone_number;
      this.address = data.address;
      this.password = data.password;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
      this.is_active = data.is_active === "1" ? true : data.is_active === "0" ? false : data.is_active;
      this.date_of_birth = data.date_of_birth;
      this.facebook_account_id = data.facebook_account_id;
      this.google_account_id = data.google_account_id;
      this.role_id = data.role_id;
    }
  }
  