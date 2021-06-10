import { useState } from 'react';
import { MdAirplanemodeActive } from "react-icons/md";
import Placeholder from './Placeholder';
import { useTenants } from "../../../context/TenantContext";
import { Logo } from '..';

const SideBarItem = ({code, name, isSelected, onClick}) => (
  <button 
    className={` font-bold py-2 hover:text-blue-400 cursor-pointer animate flex items-center focus:outline-none ${
      isSelected ? "underline text-blue-400" : "text-blue-800"}`}
      onClick={onClick}
  >
     <MdAirplanemodeActive
        className="mr-2"
    />
    {name}
  </button>
)

const SideBar = ({show, toggleFunction}) => {
  const {
    loading = false,
    tenants = [],
    selectedTenant, 
    setSelectecTenant,
  } = useTenants();
  
  const [search, setSearch] = useState("");

  function handleSearch(e) {
      const { value } = e.target;
      setSearch(value);
  }

  function tenantsFiltered(list) {
      return list.filter(
          ({ name, code }) =>
              name.toUpperCase().includes(search.toUpperCase()) ||
              code.toUpperCase().includes(search.toUpperCase())
      );
  }

  return (
    <div
      className={`${
          show ? "" : "hidden"
      } xl:block fixed top-0 left-0 h-screen overflow-y-auto bg-white shadow text-left px-5 pb-5 z-30`}
      style={{ width: 300, minWidth: 300 }}
    >
      <button
          className="visible xl:hidden text-blue-800 text-3xl leading-none float-right mt-3"
          onClick={() => toggleFunction(false)}
      >
          &times;
      </button>
      {loading === true && <Placeholder />}
      {tenants.length > 0 && (
        <>
          <Logo />
          <input
              type="search"
              placeholder="Search Tenant"
              className="h-12 sticky top-0 w-full bg-gray-200 border mb-4 px-5 placeholder-blue-800 text-lg text-blue-800 rounded-lg focus:outline-none animate focus:shadow-xl"
              onChange={handleSearch}
          />
          <nav className="flex flex-col list-none">
                {tenantsFiltered(tenants).map(({ name, code, hasFc }) => (
                    <SideBarItem
                        key={code}
                        code={code}
                        name={name}
                        isActive={code === selectedTenant?.code}
                        onClick={() => setSelectecTenant(code)}
                    >
                        <MdAirplanemodeActive
                            className={`mr-2 ${
                                !hasFc ? "text-red-400" : ""
                            }`}
                        />
                        {name}
                    </SideBarItem>
                ))}
            </nav>
        </>
      )}
    </div>
);
}
export default SideBar;