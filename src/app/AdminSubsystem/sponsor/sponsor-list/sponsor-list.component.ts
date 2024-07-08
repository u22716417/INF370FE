import { Component, OnInit } from '@angular/core';
import { SponsorServiceService } from '../service/sponsor-service.service';
import { Sponsor } from '../sponsor';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrl: './sponsor-list.component.css'
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

  constructor(private sponsorService: SponsorServiceService) { }

  editSponsor: Sponsor | null = null;
  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    this.sponsorService.getSponsors().subscribe((data: Sponsor[]) => {
      this.sponsors = data;
    });
  }
  deleteSponsor(sponsorId: number): void {
    this.sponsorService.deleteSponsor(sponsorId).subscribe(() => {
      this.sponsors = this.sponsors.filter(s => s.sponsorId !== sponsorId);
    });
  }

  selectSponsor(sponsor: Sponsor): void {
    this.editSponsor = { ...sponsor };
  }

}
