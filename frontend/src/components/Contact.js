import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [company, setCompany] = useState([]);
    
    // Get company details to populate the expanded card
    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/company')
            .then(response => response.json())
            .then(data => setCompany(data))
            .catch((error) => {
                console.error('Error in Contact:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error in Contact:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

    return (
        <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{contact.name}</h3>
                <br></br>
                {/* Task 1.1 */}
                <div className='summary'>
                    <p><b>Name: </b>{contact.name}</p>
                    <p><b>Address: </b>{contact.address}</p>
                </div>
                <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>

            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} company={company}/>
            </div>
        </div>
    );
}

export default Contact;
