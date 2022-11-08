import { BaseRawLogbook } from '../types';

export namespace DivingLog {
  export interface Dive {
    Divedate: string;
    Entrytime: string;
    Divetime: number;
    Profile?: { P: string[] };
    Rep: 'False' | 'True';
    UsedEquip: string;
    PresE: number;
    PresS: number;
    UWCurrent?: string;
    Tanksize: string;
    Divemaster: string;
    Surfint: string;
    DblTank: 'False' | 'True';
    Place: { A_Name: string; Lat: number; Lon: number };
    City?: { A_Name: string };
    Country?: { A_Name: string };
    Depth: number;
    Comments: string;
    Divetype: string;
    Water: string;
    Weather: string;
    Weight: string;
    Surface: string;
    Number: number;
    Entry: string;
    Decostops: string;
    Deco: 'False' | 'True';
    Buddy?: { A_Names: string };
    CNS: number;
    PGStart: string;
    PGEnd: string;
    Boat: string;
    Rating: number;
    O2: number;
    He: number;
    SupplyType: string;
    MinPPO2: number;
    MaxPPO2: number;
    ShopID: number;
    TripID: number;
  }

  export interface RawLogbook extends BaseRawLogbook {
    Divinglog: {
      Header: {
        AppName: string;
        AppVersion: string;
        ExportDate: string;
      };
      Logbook: { Dive: Dive | Dive[] };
    };
  }
}
