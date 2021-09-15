import React from 'react'
// import { Tab } from "react-tabs";
import './TabHeader.scss'

export const TabHeader = ({ tab, count, handleClick, active }) => {
  return (
        <li onClick={handleClick}
            className={'contact__tab' + (count < 1 ? ' contact__tab--disabled' : active ? ' contact__tab--active' : '')}
            disabled={count < 1}
            key={tab}>
            {tab} <sub className={'contact__group-count'}>{count}</sub>
        </li>
  )
}
