
import { Login } from "../login";
import { Dashboard } from "../dashboard";
import { useUserContext } from "../../context/userContext";
import './app.css';

function App() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
        {error && <p className="error">{error}</p>}
        {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Login />} </>}
    </div>
  );
}

export default App;