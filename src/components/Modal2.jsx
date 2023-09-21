import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, isEvenChecked, onToggleEven }) => {
  const modalClasses = isOpen ? 'block' : 'hidden';

  return (
    <div className={`modal ${modalClasses}`}>
      <div className="modal-content p-4 bg-white shadow-md rounded-md w-1/2 mx-auto mt-20">
        <h1 className="text-xl font-bold mb-4">Contacts Modal</h1>
        <div className="mb-4">
          <button
            onClick={() => onToggleEven()}
            className={`px-4 py-2 rounded-md border ${
              isEvenChecked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Only Even
          </button>
        </div>
        <ul>
          {/* Replace this with your contact list */}
          {isEvenChecked ? (
            // Display only even contacts based on your data structure
            // For example, assuming you have an array of contacts
            // with 'id' as the identifier.
            contacts
              .filter((contact) => contact.id % 2 === 0)
              .map((contact) => (
                <li key={contact.id}>{contact.name}</li>
              ))
          ) : (
            // Display all contacts
            // Replace this with your actual contact list
            contacts.map((contact) => (
              <li key={contact.id}>{contact.name}</li>
            ))
          )}
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal