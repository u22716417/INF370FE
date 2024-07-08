export interface Admin {
    adminId: number;
    // Add other properties as per your Admin class definition
  }
  
  export interface CouponCode {
    couponCodeId: number;
    // Add other properties as per your CouponCode class definition
  }
  
  export interface Sponsor {
    sponsorId: number;
    adminId?: number;
    couponCodeId?: number;
    sponsorName: string;
    sponsorDescription: string;
    sponsorEmail: string;
    sponsorPhone: number;
    admin?: Admin;
    couponCode?: CouponCode;
  }
  