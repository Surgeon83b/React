import { useState, useEffect, useMemo, useCallback } from "react";
import type { CountryData, YearlyData } from "../utils/types";

export const useCountriesData = () => {
  const [data, setData] = useState<Map<string, CountryData>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<
    "idle" | "downloading" | "parsing" | "complete"
  >("idle");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setProgress(0);
    setStage("downloading");
    setError(null);

    try {
      const rawUrl =
        "https://raw.githubusercontent.com/Surgeon83b/React/main/rs-react-app/owid-co2-data.json";

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(rawUrl, {
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProgress(30);

      const jsonData = await response.json();

      setProgress(60);
      setStage("parsing");

      const parsedData = new Map<string, CountryData>();
      const countries: [string, unknown][] = Object.entries(jsonData);

      let processed = 0;
      for (const [countryName, unknownData] of countries) {
        const countryData = unknownData as CountryData;

        if (countryData?.data?.length > 0) {
          parsedData.set(countryName, {
            name: countryName,
            iso_code: countryData.iso_code || "",
            continent: countryData.continent || "",
            data: countryData.data.sort(
              (a: YearlyData, b: YearlyData) => (a.year || 0) - (b.year || 0),
            ),
          });
        }

        processed++;

        const parseProgress =
          60 + Math.round((processed / countries.length) * 40);
        setProgress(parseProgress);

        if (processed % 25 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }

      setData(parsedData);
      setProgress(100);
      setStage("complete");
    } catch (err) {
      const error = err as Error;
      console.error("GitHub fetch error:", err);

      if (error.name === "AbortError") {
        setError("Request timeout. The server is not responding.");
      } else if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        setError("Network error. Please check your internet connection.");
      } else if (error.message.includes("CORS")) {
        setError("CORS error. Try loading the file from a different source.");
      } else {
        setError(`Failed to load data: ${error.message}`);
      }

      setProgress(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getRegions = useMemo(() => {
    const regions = new Set<string>();
    data.forEach((country) => {
      if (country.continent) regions.add(country.continent);
    });
    return Array.from(regions).sort();
  }, [data]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    data.forEach((country) => {
      country.data.forEach((entry) => {
        if (entry.year) years.add(entry.year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [data]);

  return {
    data,
    isLoading,
    error,
    progress,
    stage,
    getRegions,
    availableYears,
  };
};
