import { PredictResponse } from '../types';

// Read API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || '';

// High-fidelity fallback predictions matching our screenshot and spec
const SIMULATED_PREDICTIONS: Record<string, { prediction: 'BUY' | 'SELL' | 'HOLD'; confidence: number }> = {
  'RELIANCE.NS': { prediction: 'BUY', confidence: 94.22 },
  'TCS.NS': { prediction: 'BUY', confidence: 88.50 },
  'INFY.NS': { prediction: 'BUY', confidence: 91.15 },
  'HDFCBANK.NS': { prediction: 'SELL', confidence: 73.40 },
  'AAPL': { prediction: 'BUY', confidence: 85.30 },
  'MSFT': { prediction: 'BUY', confidence: 89.90 },
  'TSLA': { prediction: 'SELL', confidence: 62.80 },
  'GOOGL': { prediction: 'BUY', confidence: 92.40 },
  'AMZN': { prediction: 'HOLD', confidence: 55.20 },
};

/**
 * Predict stock trend by sending symbol to FastAPI backend or falling back to local engine.
 * @param symbol The ticker/stock symbol (e.g. RELIANCE.NS)
 * @param forceSimulation If true, skips real network call to ensure local preview interactivity
 */
export async function predictStockTrend(
  symbol: string,
  forceSimulation: boolean = false
): Promise<PredictResponse> {
  const normalizedSymbol = symbol.trim().toUpperCase();
  if (!normalizedSymbol) {
    throw new Error('Please enter a valid stock symbol.');
  }

  // Determine whether to use Live API or local simulation
  // Use live if API_URL is defined and we are not forcing simulation
  const useLiveApi = API_URL && !forceSimulation;

  if (useLiveApi) {
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ symbol: normalizedSymbol }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        symbol: data.symbol || normalizedSymbol,
        prediction: (data.prediction || 'BUY').toUpperCase() as 'BUY' | 'SELL' | 'HOLD',
        confidence: typeof data.confidence === 'number' ? data.confidence : 85.0,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
    } catch (err: any) {
      console.error('FastAPI live API endpoint connection failed:', err);
      // Re-throw so the UI can display the precise error, but mention fallback option
      throw new Error(
        `Failed to reach FastAPI backend at "${API_URL}/predict". Verify backend is running and CORS is enabled, or switch to Simulator Mode. Details: ${err.message}`
      );
    }
  }

  // --- LOCAL HIGH-FIDELITY SIMULATION ---
  // Simulate network latency of 1000ms to allow proper user visualization of loading states
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const simulationKey = Object.keys(SIMULATED_PREDICTIONS).find(
    (key) => key.toLowerCase() === normalizedSymbol.toLowerCase()
  );

  if (simulationKey) {
    const simData = SIMULATED_PREDICTIONS[simulationKey];
    return {
      symbol: normalizedSymbol,
      prediction: simData.prediction,
      confidence: simData.confidence,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  }

  // If a new symbol is typed, calculate a deterministic prediction based on string hashing
  let hash = 0;
  for (let i = 0; i < normalizedSymbol.length; i++) {
    hash = normalizedSymbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);
  const options: Array<'BUY' | 'SELL' | 'HOLD'> = ['BUY', 'SELL', 'HOLD'];
  const prediction = options[absHash % 3];
  const confidence = parseFloat((60 + (absHash % 38) + Math.random() * 2).toFixed(2));

  return {
    symbol: normalizedSymbol,
    prediction,
    confidence,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

/**
 * Returns whether the application is configured to run live API calls or simulator mode.
 */
export function getApiConfig() {
  return {
    apiUrl: API_URL,
    isConfigured: !!API_URL,
  };
}
