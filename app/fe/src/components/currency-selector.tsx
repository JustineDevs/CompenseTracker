'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Search, Check } from 'lucide-react';
import { SUPPORTED_CURRENCIES, Currency } from '@/utils/currency';

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  error?: string;
}

export function CurrencySelector({ value, onChange, error }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>(SUPPORTED_CURRENCIES);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === value);

  // Filter currencies based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCurrencies(SUPPORTED_CURRENCIES);
    } else {
      const filtered = SUPPORTED_CURRENCIES.filter(currency =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCurrencies(filtered);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleCurrencySelect = (currency: Currency) => {
    onChange(currency.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  const groupedCurrencies = {
    'Major Global': filteredCurrencies.slice(0, 8),
    'European': filteredCurrencies.slice(8, 20),
    'Asian': filteredCurrencies.slice(20, 36),
    'Middle East & Africa': filteredCurrencies.slice(36, 58),
    'Americas': filteredCurrencies.slice(58, 80),
    'Oceania': filteredCurrencies.slice(80, 87),
    'Cryptocurrencies': filteredCurrencies.slice(87)
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Globe className="w-4 h-4 inline mr-1" />
        Currency
      </label>
      
      {/* Selected Currency Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-left flex items-center justify-between ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      >
        <span className="flex items-center">
          {selectedCurrency ? (
            <>
              <span className="text-lg mr-2">{selectedCurrency.symbol}</span>
              <span>{selectedCurrency.name} ({selectedCurrency.code})</span>
            </>
          ) : (
            <span className="text-gray-500">Select currency...</span>
          )}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Select your preferred currency for all monetary values
      </p>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-64 overflow-y-auto">
            {Object.entries(groupedCurrencies).map(([groupName, currencies]) => {
              if (currencies.length === 0) return null;
              
              return (
                <div key={groupName}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                    {groupName}
                  </div>
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => handleCurrencySelect(currency)}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center justify-between ${
                        currency.code === value ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="text-lg mr-3">{currency.symbol}</span>
                        <span>{currency.name}</span>
                        <span className="ml-2 text-gray-500">({currency.code})</span>
                      </span>
                      {currency.code === value && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
            
            {filteredCurrencies.length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                No currencies found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
