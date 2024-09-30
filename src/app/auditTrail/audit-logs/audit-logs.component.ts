import { Component, OnInit } from '@angular/core';
import { AuditService } from '../audit.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
})
export class AuditLogsComponent  implements OnInit {

  auditLogs: any[] = [];
  filteredAuditLogs: any[] = [];
  isLoading = true;
  error: string | null = null;
  showHelpModal = false;  // State for displaying help modal


  // Filter properties
  startDate: string = '';
  endDate: string = '';
  selectedActionedBy: string = '';
  selectedProduct: string = '';
  selectedSubsystem: string = '';

  distinctUsers: string[] = [];
  distinctProducts: string[] = [];
  distinctSubsystems: string[] = [];

  constructor(private auditLogService: AuditService) {}

  ngOnInit(): void {
    this.auditLogService.getAuditLogs().subscribe({
      next: (data) => {
        this.auditLogs = data;
        this.filteredAuditLogs = data;
        this.isLoading = false;
        this.extractDistinctValues();
      },
      error: (err) => {
        this.error = 'Failed to load audit logs';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredAuditLogs = this.auditLogs.filter(log => {
      const logDate = new Date(log.timeStamp);
      const startDate = this.startDate ? new Date(this.startDate) : new Date(0);
      const endDate = this.endDate ? new Date(this.endDate) : new Date();

      const matchesDate = logDate >= startDate && logDate <= endDate;
      const matchesActionedBy = this.selectedActionedBy ? log.actionedBy === this.selectedActionedBy : true;
      const matchesProduct = this.selectedProduct ? log.product === this.selectedProduct : true;
      const matchesSubsystem = this.selectedSubsystem ? log.subSystem === this.selectedSubsystem : true;

      return matchesDate && matchesActionedBy && matchesProduct && matchesSubsystem;
    });
  }

  extractDistinctValues(): void {
    this.distinctUsers = [...new Set(this.auditLogs.map(log => log.actionedBy))];
    this.distinctProducts = [...new Set(this.auditLogs.map(log => log.product))];
    this.distinctSubsystems = [...new Set(this.auditLogs.map(log => log.subSystem))];
  }

   // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}
}