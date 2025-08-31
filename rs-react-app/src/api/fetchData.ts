export const loadCO2Data = async () => {
  try {
    const response = await fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading CO2 data:', error);
  }
};