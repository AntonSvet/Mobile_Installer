export interface IDevices {
  radio: IRadioDevices[];
  rs485: Irs485Devices[];
  addedDevice: Irs485Devices | IRadioDevices | null;
  secured: string;
}

export interface IRadioDevices {
  id: number;
  name: string;
  fullName: string;
  number: number;
  zone: (number | null)[];
  delay: (number | null)[];
  section: (number | null)[];
  statusZone: (string | null)[];
  statusDevice: string;
  image: string;
  type?: string;
  temperature?: number;
}
export interface Irs485Devices {
  id: number;
  name: string;
  fullName: string;
  number: number;
  zone: (number | null)[];
  delay: (number | null)[];
  section: (number | null)[];
  statusZone: (string | null)[];
  statusDevice: string;
  image: string;
  type?: string;
}
