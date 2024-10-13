import React, { useEffect, useRef, useState } from "react";
import { fetchClientes } from "../lib/data";

const SearchClientes = ({ onSelect, initialId }) => {
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchAndSetInitialClient = async () => {
      if (initialId) {
        try {
          const data = await fetchClientes(1000, 1);
          const client = data.rows.find((client) => client.id === initialId);

          if (client) {
            setSelectedClient(client);
            inputRef.current.value = client.Cliente;
          }
        } catch (error) {
          console.error("Error fetching initial client:", error);
        }
      }
    };

    fetchAndSetInitialClient();
  }, [initialId]);

  const handleInputChange = async () => {
    const inputValue = inputRef.current.value.toLowerCase();
    setSearchTerm(inputValue);

    if (inputValue === "") {
      setFilteredClients([]);
      return;
    }

    try {
      const data = await fetchClientes(1000, 1);
      const regex = new RegExp(inputValue, "i");

      const filtered = data.rows.filter((client) => regex.test(client.Cliente));
      setFilteredClients(filtered);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleOptionClick = (client) => {
    inputRef.current.value = client.Cliente;
    setFilteredClients([]);
    setSelectedClient(client);
    onSelect(client.id);
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        ref={inputRef}
        placeholder="Buscar cliente..."
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
      />
      {filteredClients.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg w-full max-h-52 overflow-y-auto shadow-lg z-10">
          {filteredClients.map((client) => (
            <li
              key={client.id}
              onClick={() => handleOptionClick(client)}
              className="p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100"
            >
              {client.Cliente}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchClientes;
