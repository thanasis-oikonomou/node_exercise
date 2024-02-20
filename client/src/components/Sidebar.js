import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { setCurrentContact } from '../reducers/currentContactReducer';
import { setContacts } from '../reducers/contactsReducer';
import ContactService from '../services/ContactService';

const Sidebar = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchContacts = async (userId) => {
      const contactsData = await ContactService.getContacts(userId);
      dispatch(setContacts(contactsData));
    };

    if (currentUser) fetchContacts(currentUser.id);
  }, [currentUser, dispatch]);

  const handleClick = (contact) => {
    dispatch(setCurrentContact(contact));
  };

  return (
    <div className="sidebar">
        <ListGroup className="recent-contacts">
        {contacts && contacts.map((contact, index) => (
            <ListGroup.Item className="contact" key={index} action onClick={() => handleClick(contact)}>
            {contact.firstName} {contact.lastName}
            </ListGroup.Item>
        ))}
        </ListGroup>
    </div>
  );
};

export default Sidebar;
