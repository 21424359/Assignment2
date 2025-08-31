import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');

    const phone_types = [
        {label: "Home", value: "Home"},
        {label: "Work", value: "Work"},
        {label: "Mobile", value: "Mobile"},
        {label: "Others", value: "Others"}
    ]

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                name
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setName('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/> */}
            {/* Task 1.3 */}
            <select>
                {phone_types.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} value={number}/>
            {/* Task 1.2 */}
            <button className='button green' type='submit'>Add {contact.name}'s phone</button>
        </form>
	);
}

export default NewPhone;