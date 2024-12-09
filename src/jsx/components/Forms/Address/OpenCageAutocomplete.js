/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import opencage from "opencage-api-client";
import debounce from "lodash.debounce";
import InputMask from "react-input-mask";

const OpenCageAutocomplete = ({ label, onSelect, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = process.env.REACT_APP_GEO_KEY;

  const fetchSuggestions = async (cep) => {
    if (!cep || !/^\d{5}-?\d{3}$/.test(cep)) {
      return;
    }

    setLoading(true);
    try {
      const response = await opencage.geocode({
        q: cep,
        key: api,
        limit: 5,
        language: "pt",
        countrycode: "br",
      });

      if (response.results) {
        setSuggestions(response.results);
      }
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }

    setLoading(false);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  const handleInputChange = (e) => {
    onChange(e);
    debouncedFetchSuggestions(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className="form-group" style={{ position: "relative" }}>
      <label>
        <strong>{label}</strong>
      </label>
      <InputMask
        mask="99999-999"
        name="company.address.cep"
        value={value}
        onChange={handleInputChange}
        className="form-control"
        placeholder="00000-000"
        style={{ paddingRight: "2rem" }}
      />
      {loading && (
        <div
          className="spinner-border text-primary"
          role="status"
          style={{
            position: "absolute",
            top: "70%",
            right: "0.75rem",
            width: "1rem",
            height: "1rem",
            marginTop: "-0.5rem",
          }}
        >
          <span className="visually-hidden">Carregando...</span>
        </div>
      )}
      {suggestions.length > 0 && (
        <ul
          className="list-group mt-2"
          style={{
            background: "white",
            position: "absolute",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.geometry.lat + suggestion.geometry.lng}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(suggestion)}
              style={{ cursor: "pointer" }}
            >
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpenCageAutocomplete;
