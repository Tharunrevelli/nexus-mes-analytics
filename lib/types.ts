export interface StationTelemetry {
  stationId: string;
  name: string;
  line: string;
  status: 'OPTIMAL' | 'WARNING' | 'ALERT' | 'MAINTENANCE';
  cycleTimeSec: number;
  targetCycleTimeSec: number;
  tempCelsius: number;
  vibrationMmSec: number;
  yieldPercent: number;
  availabilityPercent: number;
  performancePercent: number;
  qualityPercent: number;
  oeePercent: number;
  partsProcessedToday: number;
  scrapCountToday: number;
}

export interface WorkOrder {
  orderId: string;
  sku: string;
  productDescription: string;
  station: string;
  batchNumber: string;
  targetQty: number;
  actualQty: number;
  scrapQty: number;
  scrapRatePercent: number;
  defectCategory: 'Thermal Warping' | 'Tolerance Drift' | 'Surface Micro-Fracture' | 'Solder Porosity' | 'Nominal';
  warrantyRiskScore: number; // 0 to 100
  operatorId: string;
  shift: 'Shift A (Morning)' | 'Shift B (Evening)' | 'Shift C (Night)';
}

export interface RequirementTraceabilityItem {
  reqId: string;
  businessNeed: string;
  functionalSpecification: string;
  mesTechnicalModule: string;
  verificationTestCase: string;
  complianceStatus: 'VERIFIED' | 'IN_PRODUCTION' | 'AUTOMATED';
}

export interface SqlQueryResult {
  columns: string[];
  rows: Record<string, any>[];
  executionTimeMs: number;
  rowCount: number;
}
