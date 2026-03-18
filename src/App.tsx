import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Button } from '@mui/material';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

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

  const columnDefs = [
    { field: 'brand',              headerName: 'Brand',  flex: 1 },
    { field: 'model',              headerName: 'Model',  flex: 1 },
    { field: 'color',              headerName: 'Color',  flex: 1 },
    { field: 'registrationNumber', headerName: 'Reg No', flex: 1 },
    { field: 'modelYear',          headerName: 'Year',   flex: 1 },
    { field: 'price',              headerName: 'Price',  flex: 1 },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'user', password: 'user' })
    })
    .then(response => response.headers.get('Authorization'))
    .then(token => fetch('http://localhost:8081/api/cars', {
      headers: { 'Authorization': token ?? '' }
    }))
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error('Error:', err));
  };

  return (
    <div style={{ padding: "20px", height: "100vh" }}>
      <h2>Car Management</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchCars}
        style={{ marginBottom: "10px" }}
      >
        Refresh Cars
      </Button>

      <div style={{ height: "70vh", width: "100%" }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={{ type: "fitGridWidth" }}
        />
      </div>
    </div>
  );
}

export default App;