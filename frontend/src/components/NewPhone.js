import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, set_phone_number] = useState('');
    const [phone_type, set_phone_type] = useState('');

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
                phone_number,
                phone_type
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        set_phone_number('');
        set_phone_type('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/> */}
            {/* Task 1.3 */}
            <select onChange={(e) => set_phone_type(e.target.value)}>
                {phone_types.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => set_phone_number(e.target.value)} value={phone_number}/>
            {/* Task 1.2 */}
            <button className='button green' type='submit'>Add {contact.name}'s phone</button>
        </form>
	);
}

export default NewPhone;
