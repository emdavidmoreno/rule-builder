import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TenantContext = createContext();
export const useTenants = () => useContext(TenantContext);

const URL = "https://em-frontend-admin-dev.airtrfx.com/tenants";

function getHeaders() {
  return {
    'x-api-key': 'QMgaU4AGSFGVjZundy7W'
  }
}


export const TenantProvider = ({children}) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectecTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTenants = async () => {
    try {
      const { data } = await axios.get(URL, {
        headers: getHeaders()
      });
      setTenants(data);
      setLoading(false);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getTenants();
  }, []);

  return (
    <TenantContext.Provider value={{
      tenants,
      loading,
      selectedTenant,
      setSelectecTenant,
    }}>
      {children}
    </TenantContext.Provider>
  )

}
