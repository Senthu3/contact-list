import React, { useContext } from 'react'
import { ContactContext } from '../../services/providers'
import './Card.scss'

export const Card = ({ contact }) => {
    // setSelectedContact is used in this component to set the setSelectedContact to NULL
    // When the card is closed
  const [, setSelectedContact] = useContext(ContactContext)

  const handleClose = () => setSelectedContact(null)
  return (
        <div className={'card'}>
            <button className={'card__close'} onClick={handleClose}>
                <span>X</span>
            </button>
            <div className={'card__display-picture'}>
                <img alt={contact.name.first} src={contact.picture.medium}/>
            </div>
            <div className={'card__information'}>
                <div className={'card__username'}>
                    <span className="card__username-lastname">{contact.name.last}, </span>
                    <span className="card__username-firstname">{contact.name.first}</span>
                </div>
                <div className={'card__details'}>
                    <span className={'card__details-key'}>e-mail</span>
                    <span className={'card__details-value'}>{contact.email}</span>
                </div>
                <div className={'card__details'}>
                    <span className={'card__details-key'} >phone</span>
                    <span className={'card__details-value'}>{contact.phone}</span>
                </div>
                <div className={'card__details'}>
                    <span className={'card__details-key'} >street</span>
                    <span className={'card__details-value'}>{contact.location.street.name} {contact.location.street.number}</span>
                </div>
                <div className={'card__details'}>
                    <span className={'card__details-key'} >city</span>
                    <span className={'card__details-value'}>{contact.location.city}</span>
                </div>
                <div className={'card__details'}>
                    <span className={'card__details-key'} >state</span>
                    <span className={'card__details-value'}>{contact.location.state}</span>
                </div>
                <div className={'card__details'}>
                    <span className={'card__details-key'} >postcode</span>
                    <span className={'card__details-value'}>{contact.location.postcode}</span>
                </div>
            </div>
            <div className={'card__label'}>
                <span className={'card__label-key'} >Username</span>
                <span className={'card__label-value'}>{contact.login.username}</span>
            </div>
        </div>
  )
}
