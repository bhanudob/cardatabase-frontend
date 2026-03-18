import { useState } from 'react'

// TypeScript interface — defines the shape of a Car object
interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
}

// Typed props — TypeScript knows exactly what this component expects
interface HelloProps {
  name: string;
  age: number;
}

function Hello({ name, age }: HelloProps) {
  return <p>Hello {name}, you are {age} years old!</p>;
}

function App() {
  // TypeScript knows cars is an array of Car objects
  const [cars, setCars] = useState<Car[]>([
    { id: 1, brand: 'Ford',   model: 'Mustang', year: 2023 },
    { id: 2, brand: 'Toyota', model: 'Prius',   year: 2022 },
    { id: 3, brand: 'Tesla',  model: 'Model S', year: 2024 },
  ]);

  return (
    <>
      <Hello name="John" age={25} />
      <h2>Cars</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car: Car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;