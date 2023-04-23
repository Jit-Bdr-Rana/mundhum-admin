export class Shipment {
  id: string; //(auto increment)

  billNo: string;
  //shipper
  shipperName: string;
  shipperContact: string;
  shipperAddress: string;
  shipperEmail: string;
  //receiver
  receiverDetatils: string;
  receiverContact: string;
  receiverAddress: string;
  receiverEmail: string;

  type: string;
  weight: string;
  courier: string;
  packages: string;
  mode: string;
  product: string;
  quantity: string;
  paymentmode: object;
  totalFreight: string;
  carrier: object; //(referenbce to carrier modal)
  carrierReferenceNo: string;
  departureTime: string;
  origin: string;
  destination: string;
  pickupDate: Date;
  pickupTime: string;
  expectedDeliveryDate: Date;
  comment: string;

  status: string; //(status herera enum banau)
  publishLocation: string;
  branch: object; // (refrence to branch modal)
  draft: boolean;
  publishRemarks: string;
  user: object; // (reference to user modal)
  cretedAt: Date;
  updatedAt: Date;
  /**
   * Creates an instance of shipment data
   * @param {{}} params
   */
  constructor(params: Object = {}) {
    for (let name in params) {
      //@ts-ignore
      this[name] = params[name];
    }
  }
}
