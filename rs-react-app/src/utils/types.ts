export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  cement_co2?: number;
  coal_co2?: number;
  consumption_co2?: number;
  energy_per_capita?: number;
  energy_per_gdp?: number;
  gas_co2?: number;
  ghg_excluding_lucf_per_capita?: number;
  ghg_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  oil_co2?: number;
  other_industry_co2?: number;
  primary_energy_consumption?: number;
  share_global_co2?: number;
  share_global_cement_co2?: number;
  share_global_coal_co2?: number;
  share_global_gas_co2?: number;
  share_global_oil_co2?: number;
  temperature_change_from_co2?: number;
  total_ghg?: number;
  trade_co2?: number;
}

export interface CountryData {
  name: string;
  iso_code?: string;
  continent?: string;
  data: YearlyData[];
}

export type DataField = keyof Omit<YearlyData, 'year'>;