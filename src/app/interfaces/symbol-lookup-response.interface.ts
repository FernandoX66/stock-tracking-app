export interface SymbolLookupResponse {
  count: number;
  result: Company[];
}

export interface Company {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
