import { useState } from 'react';

function NewContact(props) {
    const {contacts, setContacts} = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [company_name, set_company_name] = useState('');
    const [company_address, set_company_address] = useState('');

    async function createContact(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address
            })
        });

        const data = await response.json();

        if (data.id) {
            setContacts([...contacts, data]);
            const company = await fetch('http://localhost/api/contacts/'+ data.id + '/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_name,
                    company_address,

                })
            })
        }

        setName('');
        setAddress('');
        set_company_name('');
        set_company_address('');
    }

	return (
        <form className='new-contact' onSubmit={createContact}>
            <p>Contact Name:</p>
            <input type='text' placeholder='Enter Contact Name' onChange={(e) => setName(e.target.value)} value={name}/>
            <p>Contact Address:</p>
            <input type='text' placeholder='Enter Contact Address' onChange={(e) => setAddress(e.target.value)} value={address}/>
            <p>Company Name:</p>
            <input type='text' placeholder='Enter Contact Name' onChange={(e) => set_company_name(e.target.value)} value={company_name}/>
            <p>Company Address:</p>
            <input type='text' placeholder='Enter Contact Address' onChange={(e) => set_company_address(e.target.value)} value={company_address}/>
            <button className='button green' type='submit'>Create Contact</button>
        </form>
	);
}

export default NewContact;
