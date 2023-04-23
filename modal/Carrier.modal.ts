export default class Carrier {
  id: string;
  name: string;
  website: string;
  email: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;

  public toString(): string {
    return (
      "[id=" +
      this.id +
      "name=" +
      this.name +
      "contact=" +
      this.contact +
      "website=" +
      this.website +
      "email=" +
      this.email +
      "createdAt=" +
      this.createdAt +
      "updatedAt" +
      this.updatedAt +
      "]"
    );
  }
}
