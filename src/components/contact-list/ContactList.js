import React, { useState, useEffect } from 'react'
import { ApiCall } from '../../api/apicalls'
import { ContactItem } from '../contact-item/ContactItem'
import { TabHeader } from '../tab-header/TabHeader'
import { ContactContext } from '../../services/providers'
import config from '../../config'
import './ContactList.scss'

const api = new ApiCall()
export const ContactList = () => {
  const [tabs, setTabs] = useState()
  const [selectedTab, setSelectedTab] = useState('a')
  const [selectedContact, setSelectedContact] = useState()

  useEffect(() => {
    const groupedContacts = (contacts) => {
    	const tabHeaderData = {},
        	alpha = Array.from(Array(26)).map((e, i) => i + 97),
            alphabet = alpha.map((x) => String.fromCharCode(x))
      alphabet.forEach(tabKey => tabHeaderData[tabKey] = [])
      contacts.forEach((contact) => {
        const tab = tabHeaderData[contact.name.last.substring(0, 1).toLocaleLowerCase()]
        tab && tab.push(contact)
      })
      return tabHeaderData
    }

    api.get(config.getContactsUrl, {
      results: config.totalContacts,
      inc: 'id,name,email,phone,location,picture,login',
      nat: 'us'
    }).then(data => data.results)
      .then(data => groupedContacts(data))
      .then(data => setTabs(data))
  }, []);

  function backAction () {
    const currentSelectedCharCode = selectedTab.charCodeAt(0);
    if (currentSelectedCharCode !== 97) {
      setSelectedTab(String.fromCharCode(currentSelectedCharCode - 1))
    }
  }

  function nextAction () {
    const currentSelectedCharCode = selectedTab.charCodeAt(0);
    if (currentSelectedCharCode !== 122) {
      setSelectedTab(String.fromCharCode(currentSelectedCharCode + 1))
    }
  }

  return (
        <ContactContext.Provider value={[selectedContact, setSelectedContact]}>
            <main className="contact contact__wrapper">
                <h1>Contacts List</h1>
				<div className="contact__tab-arrows">
					<span onClick={backAction} className={'contact__tab-back contact__tab-arrow' + (selectedTab === 'a' ? ' contact__tab-arrow--disabled' : '') } >{'<'}</span>
					<span onClick={nextAction} className={'contact__tab-next contact__tab-arrow' + (selectedTab === 'z' ? ' contact__tab-arrow--disabled' : '') } >{'>'}</span>
				</div>
                <div>
					<ul className="contact__tab-wrapper">
						{tabs && Object.keys(tabs).map((key, i) =>
							<TabHeader
								key={key}
								tab={key}
								count={tabs[key].length}
								handleClick={() => /* tabs[key].length && */ setSelectedTab(key)}
								active={key === selectedTab}
							/>
						)}
					</ul>

					<ul className={(tabs && !tabs[selectedTab].length ? ' contact__list--disabled' : 'contact__list') }>
						{selectedTab && tabs && tabs[selectedTab].map((contact, i) =>
							<ContactItem key={i} contact={contact}/>
						)}
						{ (tabs && !tabs[selectedTab].length) && <li className="contact__item contact__item--disabled">No Contacts to show in "{selectedTab.toUpperCase()}"</li> }
					</ul>
				</div>
            </main>
        </ContactContext.Provider>
  )
}
