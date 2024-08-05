import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
@Component({
  selector: 'app-customer-satisfaction-report',
  templateUrl: './customer-satisfaction-report.component.html',
  styleUrls: ['./customer-satisfaction-report.component.css']
})
export class CustomerSatisfactionReportComponent {
  customerSatisfaction: any[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchCustomerSatisfactionReport();
  }

  exportToPDF(): void {
    const data = document.getElementById('reportTable');
    if (data) {
      console.log('Table element found:', data);
      html2canvas(data).then(canvas => {
        const imgWidth = 208; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        const position = 0;

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('CustomerSatisfactionReport.pdf');
      });
    } else {
      console.log('Table element not found'); // Debug log
    }
  }

  fetchCustomerSatisfactionReport(): void {
    this.reportService.getCustomerSatisfactionReport().subscribe(
      (data: any[]) => {
        console.log('Fetched data:', data); // Debug log
        this.customerSatisfaction = data;
      },
      (error) => {
        console.error('Error fetching customer satisfaction report', error);
      }
    );
  }



}
