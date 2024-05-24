import React, { createContext, useState, useContext, useEffect } from "react";
import { getAccessToken, getFirstOpenApp } from "../../utils/storage";

/** redirect value
 * 0: selectLanguage
 * 1: login
 * 2: merchant
 */
type AuthContextData = {
  redirect?: number;
  loading: boolean;
  changeLoginStatus(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [redirect, setRedirect] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const accessToken = await getAccessToken();
      console.log("accessToken", accessToken);
      setLoading(true);
      if (accessToken) {
        setRedirect(2);
      } else {
        const openApp = await getFirstOpenApp();
        console.log("openApp", openApp);
        if (openApp) {
          setRedirect(1);
        } else {
          setRedirect(0);
        }
      }
    } catch (error) {
      setRedirect(1);
    } finally {
      setLoading(false);
    }
  }

  const changeLoginStatus = async () => {
    await loadStorageData();
  };

  return (
    <AuthContext.Provider value={{ redirect, loading, changeLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
