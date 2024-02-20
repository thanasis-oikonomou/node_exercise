import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Dropdown } from 'react-bootstrap';
import ContactService from '../services/ContactService';
import { setCurrentUser } from '../reducers/userReducer';
import { setCurrentContact } from '../reducers/currentContactReducer';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async (e) => {
        const text = e.target.value;
        setSearchText(text);
        const searchResults = await ContactService.searchUsers(text);
        setUsers(searchResults);
    };

    const handleActiveUser = (user) => {
        dispatch(setCurrentUser(user));
        dispatch(setCurrentContact(null));
        setSearchText(`${user.firstName} ${user.lastName}`)
        setUsers([]);
    }

    return (
        <Container fluid>
            <Row className="p-3">
                <Col>
                    <Form>
                        <Form.Group controlId="searchForm">
                            <Form.Label>Selected User:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search for a user by full name..."
                                onChange={handleSearch}
                                value={searchText}
                            />
                        </Form.Group>
                    </Form>
                    {(users.length) ? (
                        <Dropdown.Menu show>
                            {users.map((user) => (
                                <Dropdown.Item
                                    key={`dropdown-item-${user.id}`}
                                    onClick={(e) => handleActiveUser(user)}
                                >
                                    {user.firstName} {user.lastName}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
}

export default SearchBar;
