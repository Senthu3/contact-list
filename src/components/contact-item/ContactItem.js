import React, { useContext } from 'react'
import { Card } from '../card/Card'
import { ContactContext } from '../../services/providers'
import './ContactItem.scss'

export const toggleContact = (contact, myContact) => myContact === contact ? undefined : contact

export const ContactItem = ({ contact }) => {
  const [selectedContact, setSelectedContact] = useContext(ContactContext)

  const show = contact === selectedContact

  const handleClick = () => setSelectedContact(toggleContact(contact, selectedContact))

  return (
		<li className={'contact__item'}>
			<span onClick={handleClick}>
				<span>{contact.name.first}, </span>
				<span className={'contact__item-surname'}>{contact.name.last}</span>
			</span>
			{show && <Card contact={contact}/>}
		</li>
  	)
}
