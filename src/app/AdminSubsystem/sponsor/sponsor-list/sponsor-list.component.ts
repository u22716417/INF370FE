import { Component, OnInit } from '@angular/core';
import { SponsorServiceService } from '../service/sponsor-service.service';
import { Sponsor } from '../sponsor';
import { RouterLink } from '@angular/router';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {

  sponsors: Sponsor[] = [];
  newSponsor: Sponsor = {
    sponsorId: 0,
    sponsorName: '',
    sponsorDescription: '',
    sponsorEmail: '',
    sponsorPhone: 0
  };
  dtOptions: Config = {};

  constructor(private sponsorService: SponsorServiceService) { }

  editSponsor: Sponsor | null = null;
  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    this.sponsorService.getSponsors().subscribe(
      (data: Sponsor[]) => {
        this.sponsors = data;
      },
      (error) => {
        console.error('Error loading sponsors:', error);
        alert('Failed to load sponsors. Please try again later.');
      }
    );
  }
  

  deleteSponsor(sponsorId: number): void {
    this.sponsorService.deleteSponsor(sponsorId).subscribe(
      () => {
        this.sponsors = this.sponsors.filter(s => s.sponsorId !== sponsorId);
        alert('Sponsor has been removed successfully');
      },
      (error) => {
        console.error('Error deleting sponsor:', error);
        alert('Failed to delete sponsor. Please try again later.');
      }
    );
  }
  

  selectSponsor(sponsor: Sponsor): void {
    this.editSponsor = { ...sponsor };
  }

  exportToJson(): void {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.sponsors, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sponsors.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
