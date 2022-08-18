import * as React from 'react';
import { userList } from '../components/interface'

const AppContext = React.createContext([]);

export function AppWrapper({ children }) {
  let sharedState = () => {
    async function fetchUsers() {
        const res = await fetch('/api/User')
        const result: userList[] = await res.json()
        // console.log("data", result);
    }
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}