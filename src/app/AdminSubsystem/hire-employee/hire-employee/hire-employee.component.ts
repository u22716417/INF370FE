import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { HireEmployeeServiceService } from '../service/hire-employee-service.service';

@Component({
  selector: 'app-hire-employee',
  templateUrl: './hire-employee.component.html',
  styleUrls: ['./hire-employee.component.css']
})
export class HireEmployeeComponent implements OnInit {
  hireEmployeeForm: FormGroup;
  titles: any[] = [];
  profileImage: any;
  profileImagePreview: any;
  errorMessage: string | null = null;
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(private fb: FormBuilder, private userService: HireEmployeeServiceService) {
    this.hireEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      titleId: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getTitles().subscribe(data => {
      this.titles = data;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
  
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please select a valid image file.';
      this.profileImage = null;
      this.profileImagePreview = null;
      return;
    }
  
    // Check if the file size is less than 2MB
    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = 'The file size must be less than 2MB.';
      this.profileImage = null;
      this.profileImagePreview = null;
      return;
    }
  
    // Read the file and convert it to base64
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string; // Convert to string
        this.profileImagePreview = reader.result as string; // Preview for UI
        this.hireEmployeeForm.patchValue({
          image: this.profileImage  // Update the form control
        });
      };
      reader.readAsDataURL(file);
    }
  }
  

  submitForm(): void {
    // Check if the form is valid
    if (this.hireEmployeeForm.valid) {
      console.log('Form is valid, proceeding with submission...');
  
      // Prepare the form data to be sent
      const formData = {
        name: this.hireEmployeeForm.get('name')?.value,
        surname: this.hireEmployeeForm.get('surname')?.value,
        email: this.hireEmployeeForm.get('email')?.value,
        phone: this.hireEmployeeForm.get('phone')?.value,
        titleId: this.hireEmployeeForm.get('titleId')?.value,
        image: this.profileImage // Assuming the image is being handled separately
      };
  
      // Call the service method to hire the employee
      this.userService.hireEmployee(formData).subscribe(
        response => {
          console.log('Employee hired successfully', response);
          this.showPopupNotification('Employee login details sent!');
         // Reset the form and clear the image preview
         this.hireEmployeeForm.reset();
         this.profileImage = null;
         this.profileImagePreview = null;
 
         // Optionally reset the form controls to their default state
         Object.keys(this.hireEmployeeForm.controls).forEach(key => {
           this.hireEmployeeForm.get(key)?.setErrors(null);
         });
       },
        error => {
          console.error('Error hiring employee:', error);
          this.showPopupNotification('There was an error in hiring the employee.');
        }
      );
    } else {
      // Handle invalid form
      console.log('Form is invalid:', this.hireEmployeeForm);
      this.errorMessage = 'Please fill out all required fields.';
      console.log('Form is invalid, cannot submit.');
    }
  }
  
  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
  }
}
