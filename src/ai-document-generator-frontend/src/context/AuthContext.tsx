// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  backendActor: any | null;
  setBackendActor: (actor: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  backendActor: null,
  setBackendActor: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [backendActor, setBackendActor] = useState<any | null>(null);

  return (
    <AuthContext.Provider value={{ backendActor, setBackendActor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
