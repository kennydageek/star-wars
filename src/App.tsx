// App.tsx
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes'; // your router file

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
