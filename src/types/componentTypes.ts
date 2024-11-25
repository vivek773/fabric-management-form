export interface Fabric {
    fabricName: { value: string; label: string }[];
    perPieceRequirement: string;
    unit: string;
    processes: any[];
    colorQuantity: { color: string; quantity: string }[];
    stagestoBeSKipped: any[];
  }
  
  export interface FormValues {
    startDate: string;
    endDate: string;
    productionPerDay: string;
    totalOrderQuantity: string;
    majorFabric: { value: string; label: string } | null;
    chinaFabric: { value: string; label: string }[];
    fabrics: Fabric[];
    isInternationalFabricPresent: boolean;
  }