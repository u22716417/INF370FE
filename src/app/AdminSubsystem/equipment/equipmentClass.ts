export class Equipment {
  equipment_ID: number;
  equipment_Type_ID?: number; // The '?' makes this optional, corresponding to the nullable property in C#
  name: string;
  description: string;
  availability: string;
  condition: string;
  image: string;

  constructor(
    equipment_ID: number,
    name: string,
    description: string,
    availability: string,
    condition: string,
    image: string,
    equipment_Type_ID?: number // Optional parameter
  ) {
    this.equipment_ID = equipment_ID;
    this.name = name;
    this.description = description;
    this.availability = availability;
    this.condition = condition;
    this.image = image;
    this.equipment_Type_ID = equipment_Type_ID;
  }
}
