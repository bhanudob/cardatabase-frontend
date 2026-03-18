import { useState, useEffect } from 'react'

interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  registrationNumber: string;
  modelYear: number;
  price: number;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // Step 1: Login and get JWT token
    fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'user', password: 'user' })
    })
    .then(response => {
      // Step 2: Extract token from Authorization header
      const token = response.headers.get('Authorization');
      console.log('Token received:', token);
      return token;
    })
    .then(token => {
      // Step 3: Fetch cars using the token
      return fetch('http://localhost:8081/api/cars', {
        headers: { 'Authorization': token ?? '' }
      });
    })
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error('Error:', err));
  }, []);

  return (
    <>
      <h2>Cars from Spring Boot API</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Brand</th><th>Model</th>
            <th>Color</th><th>Year</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={index}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>{car.modelYear}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;