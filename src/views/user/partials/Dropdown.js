import React, { useState } from 'react';

export const Dropdown = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="btn btn-link" onClick={toggleDropdown}>
                {label}
            </button>
            {isOpen && (
                <div className="dropdown-menu show">
                    {children}
                </div>
            )}
        </div>
    );
};

export const DropdownMenu = ({ children }) => {
    return <div className="dropdown-menu">{children}</div>;
};

export const DropdownItem = ({ children, onClick }) => {
    return (
        <button className="dropdown-item" onClick={onClick}>
            {children}
        </button>
    );
};
