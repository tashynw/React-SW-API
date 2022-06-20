import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header-box'>
            <div className='left-buttons'>
                <Link to="/" style={{ textDecoration:'none' }}><button className='all-cards-button'><img src={require('../resources/Interview Assets/Card.svg').default} alt='icon' height={16} width={16}/>All Cards</button></Link>
            </div>
            
            <p className='header-text'>SW-<span className='header-text-span'>API Deck Builder</span></p>
            <a href='https://tashyn.com/' target="_blank" rel='noreferrer' style={{ textDecoration:'none' }}><button className='name-button'>Tashyn Wallace</button></a>
        </div>
    )
}

export default Header