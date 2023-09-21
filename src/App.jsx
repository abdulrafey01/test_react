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
    contacts_ids: [20],
    contacts: {
      20: {
        id: 20,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        country_id: 226,
        us: false,
      },
    },
  });

  const fetchData = () => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4";
    const params = {
      companyId: 560,
      page: 1,
      countryId: 226,
      noGroupDuplicates :1

    };
    axios({
      method: "GET",
      url: "https://api.dev.pastorsline.com/api/contacts.json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    }).then((res) => {
        console.log(res.data);
        setdata(res.data);
        // setcontacts(res.data.contacts);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  useEffect(() => {
    const filtered = data.contacts_ids.filter((id) => {
      const contact = data.contacts[id];
      if (!contact) return false; // Handle missing contacts
  
      // Tokenize the search query by spaces
      const searchTokens = searchQuery.toLowerCase().split(' ');
  
      // Tokenize the contact names by spaces
      const contactNameTokens = `${contact.first_name} ${contact.last_name}`.toLowerCase().split(' ');
  
      // Check if any search tokens are found in the contact names
      const nameMatches = searchTokens.every((token) =>
        contactNameTokens.some((nameToken) => nameToken.includes(token))
      );
  
      // Apply filters based on showUSContacts and onlyEven
      if (showUSContacts && onlyEven) {
        return contact.us && id % 2 === 0 && nameMatches;
      } else if (showUSContacts) {
        return contact.us && nameMatches;
      } else if (onlyEven) {
        return id % 2 === 0 && nameMatches;
      } else {
        return nameMatches;
      }
    });
  
    setFilteredContacts(filtered);

    // Further processing with filtered data
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
          className="bg-customPurple  text-white px-4 py-2 rounded-lg"
          onClick={() => {
            fetchData()
            // console.log(data);
            setshow(!show);
            setShowUSContacts(false);
            handleUrlChange("btn1");
          }}
        >
          Button A
        </button>
        <button
          className="bg-customOrange text-white px-4 py-2 rounded-lg"
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
        <div className="h-[500px]">
          <div className="flex flex-col h-full overflow-y-auto">
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
      <Modal className="overflow-y-auto" show={show2} setShow={setShow2}>
        <div className="flex flex-col w-96">
          <h1 className="text-center">Modal 2</h1>
          <ul >
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
