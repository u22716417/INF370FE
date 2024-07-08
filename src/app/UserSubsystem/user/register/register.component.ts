import { Component, OnInit } from '@angular/core';
import { User, UserManagementService, UserViewModel } from '../Admin/user-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent   implements OnInit{
  message: string = '';

  constructor(private userService: UserManagementService) { }

  ngOnInit(): void {
    this.message = '';
  }

  confirmPassword: string ='';

  newUser: UserViewModel = {
    UserId: 0,
    Username: '',
    UserPassword: '',
    UserEmail: '',
    UserType_ID: 1, // Admin Register Page
  };

  

  onSubmit() {
    if(this.confirmPassword == this.newUser.UserPassword)
      {
        this.userService.createUser(this.newUser)
            .subscribe(
              (createdUser) => {
                console.log('User created successfully:', createdUser);
                // Handle successful user creation (e.g., clear form, show success message)
              },
              (error) => {
                console.error('Error creating user:', error);
                // Handle error (e.g., display error message)
              }
            );
      }
      else{
        this.message = 'Passwords Do not Match';
      }
  }
    


}
