import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ContactService from '../services/ContactService';

const ChatRoom = () => {
  const currentUser = useSelector((state) => state.user);
  const currentContact = useSelector((state) => state.currentContact);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);

    const fetchContactMessages = async () => {
      const contactMessages = await ContactService.getContactMessages(currentUser.id, currentContact.id);
      setMessages(contactMessages);
    };

    if (currentUser && currentContact) fetchContactMessages();
  }, [currentContact, currentUser]);

  return (currentContact && currentUser) && (
    <Container className="chat-area m-3">
      <div className="chat-header">Chat with {currentContact.firstName} {currentContact.lastName}</div>
          {messages.map((message) => (
            <Row key={message.id} className={`${currentContact.id === message.senderId ? 'justify-content-start' : 'justify-content-end'}`}>
              <Col className={`${currentContact.id === message.senderId ? 'received-message' : 'sent-message'}`} sm={8}>
                {message.content}
              </Col>
            </Row>
          ))}
    </Container>
  );
};

export default ChatRoom;
