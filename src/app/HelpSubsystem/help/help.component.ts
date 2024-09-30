import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Location } from '@angular/common';
import { Config } from 'datatables.net';

interface Item {
  title: string;
  details: string[];
}

interface Section {
  title: string;
  items: Item[];
}
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  dtOptions: Config = {};
  sections: any[] = [
    {
      title: 'How to Purchase a Ticket',
      items: [
        {
          title: 'Logging In and Viewing Events',
          details: [
            'Ensure that you are logged into your account. Once logged in, you will be able to view all available events on the homepage.'
          ]
        },
        {
          title: 'Adding a Ticket to the Cart',
          details: [
            'Navigate to the event you want to attend and click the "Add to Cart" button.',
            'The system will check if tickets are still available. If they are, your ticket will be added to your cart.',
            'Click the cart icon at the top of the page to view your cart.',
            'The "Shopping Cart" modal will display details about your selected event, ticket price, subtotal, and total cost including VAT.',
            'You can adjust the quantity of tickets by using the numeric buttons. Click "+" to add more tickets or "-" to reduce the number.'
          ]
        },
        {
          title: 'Placing an Order',
          details: [
            'Once you\'re satisfied with your selection, click the "Checkout" button.',
            'The system will calculate the total price of your order, including VAT.',
            'The "Order Summary" screen will display the event name, ticket price, subtotal, and the grand total.',
            'Click the "Make Payment" button to proceed with your payment.'
          ]
        },
        {
          title: 'Completing the Purchase',
          details: [
            'After payment is successfully processed, you will receive a confirmation email with the ticket details. You can also view your order history on your profile page.'
          ]
        }
      ]
    },
    {
      title: 'How to Hire a Service',
      items: [
        {
          title: 'Requesting a Service Quote',
          details: [
            'Click on the "Hire Service" button on the main page.',
            'The "Request a Service Quote" screen will load. This screen consists of a header labeled "Request a Service Quote" displayed at the center and top.',
            'In the "Enter Service Details" section, you will find the following form controls:',
            'Choose a service: Select the desired service (e.g., Photographer, Videographer) from the dropdown list labeled "Select Service".',
            'Choose a Start Date: Select the start date for the service.',
            'Choose an End Date: Select the end date for the service.',
            'In the "Calendar" tab, view the full month, by weeks, by day, or by list, with navigation buttons to change months.',
            'Once all fields are filled out, the "Request Quotation" button will become enabled. Click this button to request a quotation.'
          ]
        },
        {
          title: 'Viewing and Managing Quotations',
          details: [
            'Click on the "Quotes" tab to view all your requested quotations.',
            'The "Quotes" tab displays a table with headers: Service Name, Start Date, End Date, Quote Price, and Approved.',
            'To approve a quotation, click the "Approve" button next to the desired quote. This will allow you to proceed with payment.',
            'If you wish to reject the quotation, click the "Reject" button, canceling the requested quote.'
          ]
        },
        {
          title: 'Completing the Service Hire',
          details: [
            'After approving the quote, a pop-up message will display saying "Successfully Approved Quote" with an "OK" button.',
            'Click "OK" to finalize the process.',
            'The system will update the availability of the service in the schedule and notify the admin of the approved quote.'
          ]
        }
      ]
    },
    {
      title: 'Viewing Cart Details',
      items: [
        {
          title: 'View Cart Details',
          details: [
            'Click the "Cart" icon button on the top navbar.',
            'The "Shopping Cart" pop-up will display your cart details, including event name, ticket price, subtotal, and total cost.',
            'Note: If there are no tickets in your cart, the system will display the message: "Your cart is empty".'
          ]
        }
      ]
    },
    {
      title: 'Updating Cart',
      items: [
        {
          title: 'Update Cart',
          details: [
            'Click the "Cart" icon button on the top navbar.',
            'The "Shopping Cart" modal will display your cart details, including event name, ticket price, subtotal, and total cost.',
            'Use the addition and subtraction buttons to increase or decrease the quantity of tickets you wish to purchase.',
            'Note: If there are not enough tickets, an error message will be displayed: "There are not enough tickets available. Please select a valid quantity".',
            'The system will save your updated cart details and reflect the new quantity on the cart icon.',
            'Alternative: If you decide not to update your cart, simply close the shopping cart modal by clicking on the cart icon or the close button.'
          ]
        }
      ]
    },
    {
      title: 'How to Update your Profile Details',
      items: [
        {
          title: 'Update Profile Details',
          details: [
            'Navigate to the top nav bar and click on the "User Profile" tab.',
            'Select the "My Profile" option from the dropdown.',
            'Click on the "Edit Profile" button.',
            'Provide your details and click on the "Save Changes" button.',
            'An "Update Successful" message will be displayed.'
          ]
        }
      ]
    },
    {
      title: 'Forgot Password',
      items: [
        {
          title: 'Steps to Recover Your Password',
          details: [
            'The user clicks on the forgot password link on the login screen.',
            'The system loads the forgot password pop-up screen and prompts the user to enter their username.',
            'The user provides their username and clicks on the submit button.',
            'The system validates the username provided and sends a temporary password to the user\'s email address.',
            'The system redirects the user to the login screen.',
            'The user provides the username with the temporary password and clicks on the login button.',
            'The system validates the provided login details.',
            'The system uses AuthGuards to load the home screen or the dashboard, depending on the user type.'
          ]
        },
      ]
    }
  ];

  constructor(private location: Location) {}

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('User Manual', 10, 10);

    let yOffset = 20;
    const fontSizeTitle = 16;
    const fontSizeBody = 12;

    this.sections.forEach((section, sectionIndex) => {
      if (yOffset > 260) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFontSize(fontSizeTitle);
      doc.text(`${sectionIndex + 1}. ${section.title}`, 10, yOffset);
      yOffset += 10;

      doc.setFontSize(fontSizeBody);
      section.items.forEach((item: Item) => {
        doc.text(item.title, 10, yOffset);
        yOffset += 10;
        item.details.forEach((detail: string) => {
          doc.text(`- ${detail}`, 10, yOffset);
          yOffset += 10;
        });
        yOffset += 5;
      });
      yOffset += 10;
    });

    doc.save('User_Manual.pdf');
  }

  goBack() {
    this.location.back();
  }

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}


