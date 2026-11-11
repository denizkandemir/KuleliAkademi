import React from "react";
import { router } from "@inertiajs/react";
import "./LanguageSchoolsWithCountry.scss";

const LANGUAGE_SCHOOLS_PATH = "/dil-okullari";

// Country (and city) filter for /dil-okullari. Filtering happens on the backend: each change
// re-requests the page with ?country=<slug>&city=<slug> and LanguageSchoolController sends
// only the matching schools. No country = all schools.
const LanguageSchoolsWithCountry = ({ countryOptions = [], selectedCountry = null, cityOptions = [], selectedCity = null }) => {
    const totalCount = countryOptions.reduce((sum, option) => sum + option.count, 0);

    const visit = (params) => {
        router.get(
            LANGUAGE_SCHOOLS_PATH,
            Object.fromEntries(Object.entries(params).filter(([, value]) => value)),
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleCountryChange = (country) => {
        if (country === selectedCountry) {
            return;
        }

        // A city belongs to one country, so changing the country resets the city.
        visit({ country });
    };

    const handleCityChange = (event) => {
        visit({ country: selectedCountry, city: event.target.value || null });
    };

    const options = [
        { label: "Tümü", value: null, count: totalCount },
        ...countryOptions,
    ];

    return (
        <div className="language-schools-filter-bar">
            <div className="language-schools-filter-group">
                <span className="language-schools-filter-label" id="language-schools-country-label">Ülke</span>
                <div className="language-schools-country-filter" role="group" aria-labelledby="language-schools-country-label">
                    {options.map((option) => {
                        const isActive = option.value === selectedCountry;

                        return (
                            <button
                                key={option.value ?? "all"}
                                type="button"
                                className={`language-schools-country-filter__button${isActive ? " is-active" : ""}`}
                                onClick={() => handleCountryChange(option.value)}
                                aria-pressed={isActive}
                            >
                                <span>{option.label}</span>
                                <small>{option.count}</small>
                            </button>
                        );
                    })}
                </div>
            </div>

            {cityOptions.length > 0 ? (
                <label className="language-schools-filter-group language-schools-city-filter">
                    <span className="language-schools-filter-label">Şehir</span>
                    <select value={selectedCity ?? ""} onChange={handleCityChange}>
                        <option value="">Tüm şehirler</option>
                        {cityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label} ({option.count})
                            </option>
                        ))}
                    </select>
                </label>
            ) : null}
        </div>
    );
};

export default LanguageSchoolsWithCountry;
