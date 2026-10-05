import { StationTelemetry, WorkOrder, RequirementTraceabilityItem, SqlQueryResult } from './types';

export const initialStations: StationTelemetry[] = [
  {
    stationId: 'ST-CNC-01',
    name: '5-Axis Precision CNC Milling',
    line: 'Line 1 - High-Precision Powertrain',
    status: 'OPTIMAL',
    cycleTimeSec: 42.5,
    targetCycleTimeSec: 40.0,
    tempCelsius: 68.2,
    vibrationMmSec: 1.4,
    yieldPercent: 98.6,
    availabilityPercent: 94.5,
    performancePercent: 93.8,
    qualityPercent: 98.6,
    oeePercent: 87.4,
    partsProcessedToday: 684,
    scrapCountToday: 9,
  },
  {
    stationId: 'ST-WELD-02',
    name: 'Robotic Laser Beam Welding Cell',
    line: 'Line 1 - High-Precision Powertrain',
    status: 'WARNING',
    cycleTimeSec: 36.8,
    targetCycleTimeSec: 32.0,
    tempCelsius: 82.4, // elevated thermal reading
    vibrationMmSec: 2.8, // slight bearing wear
    yieldPercent: 95.1,
    availabilityPercent: 91.2,
    performancePercent: 87.0,
    qualityPercent: 95.1,
    oeePercent: 75.4,
    partsProcessedToday: 512,
    scrapCountToday: 26,
  },
  {
    stationId: 'ST-COAT-03',
    name: 'Thermal Plasma Ceramic Coating',
    line: 'Line 2 - Turbine & Aerostructures',
    status: 'OPTIMAL',
    cycleTimeSec: 58.0,
    targetCycleTimeSec: 55.0,
    tempCelsius: 74.5,
    vibrationMmSec: 1.1,
    yieldPercent: 99.1,
    availabilityPercent: 96.0,
    performancePercent: 94.8,
    qualityPercent: 99.1,
    oeePercent: 90.2,
    partsProcessedToday: 418,
    scrapCountToday: 4,
  },
  {
    stationId: 'ST-INSP-04',
    name: 'Optical Coordinate & X-Ray NDT',
    line: 'Line 2 - Turbine & Aerostructures',
    status: 'OPTIMAL',
    cycleTimeSec: 24.2,
    targetCycleTimeSec: 25.0,
    tempCelsius: 45.0,
    vibrationMmSec: 0.6,
    yieldPercent: 99.8,
    availabilityPercent: 98.5,
    performancePercent: 99.0,
    qualityPercent: 99.8,
    oeePercent: 97.3,
    partsProcessedToday: 820,
    scrapCountToday: 2,
  },
];

export const workOrdersData: WorkOrder[] = [
  {
    orderId: 'WO-8821',
    sku: 'SKU-TURB-01',
    productDescription: 'Titanium High-Pressure Turbine Blade',
    station: 'ST-CNC-01',
    batchNumber: 'B-2026-X11',
    targetQty: 250,
    actualQty: 246,
    scrapQty: 4,
    scrapRatePercent: 1.6,
    defectCategory: 'Tolerance Drift',
    warrantyRiskScore: 14,
    operatorId: 'OP-449',
    shift: 'Shift A (Morning)',
  },
  {
    orderId: 'WO-8822',
    sku: 'SKU-HYDR-04',
    productDescription: 'High-Torque Electro-Hydraulic Actuator',
    station: 'ST-WELD-02',
    batchNumber: 'B-2026-X12',
    targetQty: 180,
    actualQty: 162,
    scrapQty: 18,
    scrapRatePercent: 10.0,
    defectCategory: 'Thermal Warping',
    warrantyRiskScore: 68, // high risk
    operatorId: 'OP-312',
    shift: 'Shift B (Evening)',
  },
  {
    orderId: 'WO-8823',
    sku: 'SKU-VALV-12',
    productDescription: 'Cryogenic Liquid Fuel Solenoid Valve',
    station: 'ST-COAT-03',
    batchNumber: 'B-2026-X13',
    targetQty: 300,
    actualQty: 297,
    scrapQty: 3,
    scrapRatePercent: 1.0,
    defectCategory: 'Nominal',
    warrantyRiskScore: 8,
    operatorId: 'OP-519',
    shift: 'Shift A (Morning)',
  },
  {
    orderId: 'WO-8824',
    sku: 'SKU-CTRL-09',
    productDescription: 'Industrial Edge ECU Controller Module',
    station: 'ST-INSP-04',
    batchNumber: 'B-2026-X14',
    targetQty: 500,
    actualQty: 498,
    scrapQty: 2,
    scrapRatePercent: 0.4,
    defectCategory: 'Nominal',
    warrantyRiskScore: 5,
    operatorId: 'OP-204',
    shift: 'Shift A (Morning)',
  },
  {
    orderId: 'WO-8825',
    sku: 'SKU-BRNG-88',
    productDescription: 'High-Velocity Ceramic Spindle Bearing',
    station: 'ST-WELD-02',
    batchNumber: 'B-2026-X15',
    targetQty: 200,
    actualQty: 186,
    scrapQty: 14,
    scrapRatePercent: 7.0,
    defectCategory: 'Solder Porosity',
    warrantyRiskScore: 42,
    operatorId: 'OP-312',
    shift: 'Shift C (Night)',
  },
];

export const rtmDataset: RequirementTraceabilityItem[] = [
  {
    reqId: 'BR-MES-01',
    businessNeed: 'Real-time telemetry ingestion from multi-vendor CNC & robotic cells with < 50ms latency',
    functionalSpecification: 'OPC-UA / MQTT dual gateway ingesting 100Hz vibration, thermal, and torque telemetries',
    mesTechnicalModule: 'nexus::iot_telemetry_gateway',
    verificationTestCase: 'TC-IOT-PERF-01 (10,000 msg/sec load test)',
    complianceStatus: 'AUTOMATED',
  },
  {
    reqId: 'BR-MES-02',
    businessNeed: 'Early warning anomaly detection preventing out-of-spec batches before post-production quality gate',
    functionalSpecification: 'Rolling EWMA & dynamic 3-sigma tolerance envelope on weld bead temperatures',
    mesTechnicalModule: 'nexus::predictive_quality_engine',
    verificationTestCase: 'TC-ANOM-PRECISION-04 (ROC AUC > 0.94)',
    complianceStatus: 'VERIFIED',
  },
  {
    reqId: 'BR-MES-03',
    businessNeed: 'Automated post-sale warranty liability risk scoring linked to shopfloor batch geneology',
    functionalSpecification: 'Traceability database linking serialised part numbers to manufacturing sensor variance',
    mesTechnicalModule: 'nexus::warranty_geneology_tracer',
    verificationTestCase: 'TC-GEN-AUDIT-12 (Serialised ISO-9001 compliance)',
    complianceStatus: 'IN_PRODUCTION',
  },
  {
    reqId: 'BR-MES-04',
    businessNeed: 'SQL & Power BI analytics studio for plant controllers with sub-second OLAP aggregations',
    functionalSpecification: 'In-memory columnar query engine supporting OEE, defect Pareto, and MTBF/MTTR metrics',
    mesTechnicalModule: 'nexus::sql_analytics_explorer',
    verificationTestCase: 'TC-OLAP-LATENCY-03 (< 15ms execution)',
    complianceStatus: 'AUTOMATED',
  },
];

export const sqlPresets = [
  {
    id: 'oee_by_station',
    name: '1. OEE & Yield Breakdown by Station',
    query: `SELECT stationId, name, oeePercent, yieldPercent, scrapCountToday
FROM StationTelemetry
ORDER BY oeePercent ASC;`,
    description: 'Identifies production bottlenecks and stations operating below 85% world-class OEE benchmark.',
  },
  {
    id: 'warranty_risk_workorders',
    name: '2. High Warranty Risk Batches (Risk Score > 40)',
    query: `SELECT orderId, sku, station, defectCategory, scrapRatePercent, warrantyRiskScore
FROM WorkOrders
WHERE warrantyRiskScore > 40
ORDER BY warrantyRiskScore DESC;`,
    description: 'Filters work orders with high probability of warranty field claims for proactive inspection quarantine.',
  },
  {
    id: 'scrap_by_shift',
    name: '3. Scrap Analysis by Operator Shift',
    query: `SELECT shift, COUNT(*) AS TotalBatches, SUM(scrapQty) AS TotalScrap, AVG(scrapRatePercent) AS AvgScrapRate
FROM WorkOrders
GROUP BY shift
ORDER BY TotalScrap DESC;`,
    description: 'Highlights shift variance to determine operator training needs and environmental drift.',
  },
];

export function executeQuery(queryText: string): SqlQueryResult {
  const start = performance.now();
  const q = queryText.toLowerCase();

  let columns: string[] = [];
  let rows: Record<string, any>[] = [];

  if (q.includes('where warrantyriskscore > 40') || q.includes('warranty risk')) {
    columns = ['Order ID', 'SKU', 'Station', 'Defect Category', 'Scrap %', 'Warranty Risk (0-100)'];
    rows = workOrdersData
      .filter((w) => w.warrantyRiskScore > 40)
      .map((w) => ({
        'Order ID': w.orderId,
        SKU: w.sku,
        Station: w.station,
        'Defect Category': w.defectCategory,
        'Scrap %': `${w.scrapRatePercent.toFixed(1)}%`,
        'Warranty Risk (0-100)': w.warrantyRiskScore,
      }));
  } else if (q.includes('group by shift') || q.includes('shift')) {
    columns = ['Shift Name', 'Total Batches', 'Total Scrap Units', 'Avg Scrap Rate'];
    const shiftMap: Record<string, { count: number; scrap: number; scrapRateSum: number }> = {};
    workOrdersData.forEach((w) => {
      if (!shiftMap[w.shift]) shiftMap[w.shift] = { count: 0, scrap: 0, scrapRateSum: 0 };
      shiftMap[w.shift].count++;
      shiftMap[w.shift].scrap += w.scrapQty;
      shiftMap[w.shift].scrapRateSum += w.scrapRatePercent;
    });
    rows = Object.entries(shiftMap).map(([shift, val]) => ({
      'Shift Name': shift,
      'Total Batches': val.count,
      'Total Scrap Units': val.scrap,
      'Avg Scrap Rate': `${(val.scrapRateSum / val.count).toFixed(1)}%`,
    }));
  } else {
    // Default: OEE by Station
    columns = ['Station ID', 'Station Name', 'OEE %', 'Yield %', 'Scrap Today'];
    rows = initialStations.map((s) => ({
      'Station ID': s.stationId,
      'Station Name': s.name,
      'OEE %': `${s.oeePercent}%`,
      'Yield %': `${s.yieldPercent}%`,
      'Scrap Today': s.scrapCountToday,
    }));
  }

  const duration = performance.now() - start;
  return {
    columns,
    rows,
    executionTimeMs: Math.max(0.42, Number(duration.toFixed(2))),
    rowCount: rows.length,
  };
}
