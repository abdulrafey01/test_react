import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";

export default function App() {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [show, setshow] = useState(false);
  const [showUSContacts, setShowUSContacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [show2, setShow2] = useState(false);

  const [selectedContact, setselectedContact] = useState(null);

  const [onlyEven, setOnlyEven] = useState(false);

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const [data, setdata] = useState({
    total: 10,
    contacts_ids: [745450, 502931, 745452, 502933, 11, 20],
    contacts: {
      745450: {
        id: 745450,
        first_name: "Jason1",
        last_name: "Alexis1",
        email: null,
        phone_number: "9404480524",
        country_id: 226,
        us: true,
      },
      502931: {
        id: 502931,
        first_name: "jason",
        last_name: "Alexis",
        email: "",
        phone_number: "0",
        country_id: 226,
        us: false,
      },
      745452: {
        id: 745450,
        first_name: "Jason1",
        last_name: "Alexis1",
        email: null,
        phone_number: "9404480524",
        country_id: 226,
        us: true,
      },
      502933: {
        id: 502931,
        first_name: "jason",
        last_name: "Alexis",
        email: "",
        phone_number: "0",
        country_id: 226,
        us: false,
      },
      11: {
        id: 11,
        first_name: "Ali",
        last_name: "Afzal",
        email: null,
        phone_number: "9404480524",
        country_id: 226,
        us: true,
      },
      20: {
        id: 20,
        first_name: "Ahmed",
        last_name: "Javed",
        email: "",
        phone_number: "0",
        country_id: 226,
        us: false,
      },
    },
  });

  // const fetchData = () => {
  //   const token =
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4";
  //   const params = {
  //     companyId: 171,
  //     page: 1,
  //     countryId: 226,
  //   };
  //   axios({
  //     method: "GET",
  //     url: "https://api.dev.pastorsline.com/api/contacts.json",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: params,
  //   }).then((res) => {
  //       console.log(res.data);
  //       setdata(res.data);
  //       setcontacts(res.data.contacts);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // };
  useEffect(() => {
    const filtered = data.contacts_ids.filter((id) => {
      const contact = data.contacts[id];
      if (!contact) return false; // Handle missing contacts
  
      if (showUSContacts && onlyEven) {
        // Filter by US, even IDs, and search query
        return (
          contact.us &&
          id % 2 === 0 &&
          (contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      } else if (showUSContacts) {
        // Filter by US and search query
        return (
          contact.us &&
          (contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      } else if (onlyEven) {
        // Filter by even IDs and search query (both US and non-US)
        return (
          id % 2 === 0 &&
          (contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      } else {
        // Filter by search query only (both US and non-US)
        return (
          contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    });
  
    setFilteredContacts(filtered);
  }, [data.contacts_ids, data.contacts, searchQuery, showUSContacts, onlyEven]);
  

  const handleUrlChange = (btnName) => {
    const existingUrl = "http://127.0.0.1:30080/";
    const newUrl = `${existingUrl}?${btnName}`;

    window.history.pushState({ button: btnName }, "", newUrl);
  };

  const onCloseUrlChange = (btnName) => {
    const existingUrl = "http://127.0.0.1:30080/";

    // window.history.pushState({ button: btnName }, '', existingUrl);
    window.history.pushState({ button: btnName }, "", existingUrl);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-row gap-4">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            // fetchData()
            // console.log(data);
            setshow(!show);
            setShowUSContacts(false);
            handleUrlChange("btn1");
          }}
        >
          Button A
        </button>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setshow(!show);
            setShowUSContacts(true);
            handleUrlChange("btn2");
          }}
        >
          Button B
        </button>
      </div>

      <Modal
        show={show}
        setShow={() => {
          setshow(false);
          onCloseUrlChange("cl");
        }}
      >
        <div>
          <div className="flex flex-col justify-center align-middle">
            <div className="mt-3">
              <input
                type="text"
                placeholder="Search contacts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-md m-2 p-2 w-full"
              />
            </div>
            <div>
            <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg mx-3"
            onClick={() => {
              setShowUSContacts(false);
              handleUrlChange("btn1");
            }}
          >
            All Contacts
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg mx-3"
            onClick={() => {
              setShowUSContacts(true);
              handleUrlChange("btn2");
            }}
          >
            US Contacts
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mx-3"
            onClick={() => {
              onCloseUrlChange("cl");
              setshow(!show);
            }}
          >
            Close
          </button>
              <h1 className="text-center">Contacts</h1>
              <ul>
                {filteredContacts.map((id) => {
                  const contact = data.contacts[id];
                  return contact ? (
                    <li
                      className="flex justify-between cursor-pointer m-2"
                      key={id}
                    >
                      <p
                        onClick={() => {
                          setShow2(true);
                          setselectedContact(contact);
                        }}
                      >
                        {contact.first_name} {contact.last_name}
                      </p>
                      <p>{contact.phone_number}</p>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          <label className="ml-3 mt-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={onlyEven}
              onChange={handleCheckboxChange}
            />
            Only even
          </label>
          
        </div>
      </Modal>
      <Modal show={show2} setShow={setShow2}>
        <div className="flex flex-col w-96">
          <h1 className="text-center">Modal 2</h1>
          <ul>
            {selectedContact && (
              <>
                <li>
                  Name: {selectedContact.first_name} {selectedContact.last_name}
                </li>
                <li>Phone Number: {selectedContact.phone_number}</li>
                <li>Email: {selectedContact.email}</li>
                <li>ID: {selectedContact.id}</li>
              </>
            )}
          </ul>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg mx-3"
            onClick={() => {
              setShow2(false)
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
