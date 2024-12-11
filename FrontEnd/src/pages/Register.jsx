import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import logo from '../images/Logo.png';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });
  const [location, setLocation] = useState({
    country: '',
    city: '',
    street: '',
    state: '',
    zip: '',
    lat: 31.208870,
    lng: 29.909201,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');
    console.log('Form Submitted:', { ...formData, location });
    alert('Registration successful!');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prev) => ({
            ...prev,
            lat: latitude,
            lng: longitude,
          }));
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          alert("Unable to fetch your location. Please manually choose your location on the map.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please manually choose your location on the map.");
    }
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ ...location, lat, lng });

        // Fetch address details from OpenStreetMap Nominatim API
        axios
          .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then((response) => {
            const { address } = response.data;
            setLocation({
              lat,
              lng,
              country: address.country || '',
              city: address.city || address.town || address.village || '',
              street: address.road || '',
              state: address.state || '',
              zip: address.postcode || '',
            });
          })
          .catch((error) => console.error('Error fetching location data:', error));
      },
    });
    return location.lat && location.lng ? <Marker position={[location.lat, location.lng]} /> : null;
  };

  return (
    <div className="min-h-scree flex items-center justify-center p-5">
      <div className="bg-[rgb(33,43,68)] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="text-center mb-8 flex justify-center">
          <img src={logo} alt="Your Logo" className="w-48 h-48" />
        </div>
        <form onSubmit={handleSubmit} className='text-white'>
          <div className="mb-4">
            <label className="block ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block ">Choose Your Location</label>
            <div className="h-64 w-full border rounded-lg overflow-hidden">
              <MapContainer center={[location.lat, location.lng]} zoom={13} className="h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </div>
            {location.country && (
              <div className="mt-4 text-gray-600">
                <p>Country: {location.country}</p>
                <p>City: {location.city}</p>
                <p>Street: {location.street}</p>
                <p>State: {location.state}</p>
                <p>Zip Code: {location.zip}</p>
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[rgb(149,171,82)] text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;