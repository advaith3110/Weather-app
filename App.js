import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/weather';
import SearchBar from './components/SearchBar';

const API_KEY = "0d6979210e52b7d49a5df7763137e4c1";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Weather data fetched successfully:", data); // Log API response
        setWeatherData(data);
      } else {
        console.log("Error: City not found");
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchWeatherData('Mumbai');
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    );
  }

  if (weatherData === null) {
    return (
      <View style={styles.container}>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>City not found! Try a different city.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
  },
});
