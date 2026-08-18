import { useRef, useState } from "react";
import "./AddressPicker.css";
import { FaTimes, FaSearch, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

function AddressPicker({ onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  const runSearch = async (text) => {
    if (text.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Couldn't search right now. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 500);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported by this browser.");
      return;
    }

    setLocating(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          onSelect({
            label: data.display_name || `${latitude}, ${longitude}`,
            lat: latitude,
            lon: longitude,
          });
        } catch (err) {
          setError("Couldn't determine your address. Try searching instead.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setError("Location access denied. Try searching instead.");
        setLocating(false);
      }
    );
  };

  return (
    <div
      className="addressOverlay"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="addressModal" onClick={(e) => e.stopPropagation()}>
        <FaTimes className="addressClose" onClick={onClose} />

        <h2>Delivery Address</h2>

        <div className="addressSearchBox">
          <FaSearch />
          <input
            type="text"
            placeholder="Search for area, street, city..."
            value={query}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <button
          type="button"
          className="currentLocationBtn"
          onClick={useCurrentLocation}
          disabled={locating}
        >
          <FaLocationArrow /> {locating ? "Locating..." : "Use my current location"}
        </button>

        {error && <p className="addressError">{error}</p>}
        {loading && <p className="addressLoading">Searching...</p>}

        <div className="addressResults">
          {results.map((place) => (
            <div
              key={place.place_id}
              className="addressResultItem"
              onClick={() =>
                onSelect({
                  label: place.display_name,
                  lat: place.lat,
                  lon: place.lon,
                })
              }
            >
              <FaMapMarkerAlt />
              <span>{place.display_name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddressPicker;
