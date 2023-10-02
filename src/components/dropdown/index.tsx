import React, { useState } from 'react';

interface DropdownProps {
  options: {
    id: number;
    nome: string;
    grupo_muscular: string;
  }[];
  onSelect: (id: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (id: number) => {
    setSelectedOption(id);
    onSelect(id);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(({ nome }) =>
    nome.toLowerCase().includes(searchInput.toLowerCase())
  );

  const displayedOptions = filteredOptions.slice(0, 5);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gray-300 p-2 rounded-md focus:outline-none"
      >
        {selectedOption ? options.find((opt) => opt.id === selectedOption)?.nome : 'Select an option'}
      </button>
      {isOpen && (
        <div className="absolute top-10 left-0 z-10 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border-b border-gray-300"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <ul>
            {displayedOptions.map(({ id, nome }) => (
              <li
                key={id}
                onClick={() => handleOptionSelect(id)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {nome}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
