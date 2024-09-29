import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backup-and-restore',
  templateUrl: './backup-and-restore.component.html',
  styleUrls: ['./backup-and-restore.component.css']
})
export class BackupAndRestoreComponent implements OnInit {
  backups: any[] = []; // To store the list of backups from the API
  isModalOpen = false; // To control the display of the modal
  selectedBackupId: number | null = null; // To store the selected backup ID
  showNotification: boolean = false;
  notificationMessage: string = '';
  isLoading: boolean = false; // Flag to indicate loading state for restore operation
  isBackingUp: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBackups(); // Load the backups when the component is initialized
  }

  // Method to trigger a database backup
  backupDatabase() {
    this.isBackingUp = true;
    this.http.post('https://localhost:7149/api/Database/backup', {}).subscribe(
      
      (response: any) => {
        this.isBackingUp = false;
        this.showPopupNotification('Backup completed successfully');
        this.getBackups(); // Refresh the backups list
      },
      (error) => {
        this.isBackingUp = false;
        console.error('Error during backup', error);
      }
    );
  }

  // Method to open the restore modal
  openRestoreModal() {
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Method to restore a backup
  restoreDatabase() {
    if (this.selectedBackupId) {
      this.isLoading = true; // Start loading
      this.http.post(`https://localhost:7149/api/Database/restore/${this.selectedBackupId}`, {}).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.showPopupNotification('Restore completed successfully');
          this.closeModal(); // Close the modal after restore
        },
        (error) => {
          this.isLoading = false;
          this.showPopupNotification('Restore failed. Please try again.');
          console.error('Error during restore', error);
        }
      );
    } else {
      this.showPopupNotification('Please select a backup to restore');
    }
  }

  // Method to fetch the list of backups from the API
  getBackups() {
    this.http.get('https://localhost:7149/api/Database/backups').subscribe(
      (response: any) => {
        this.backups = response;
      },
      (error) => {
        console.error('Error fetching backups', error);
      }
    );
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
