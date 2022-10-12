import { useState, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
      console.log('auth', isAuth);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
        <AppRouter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
