import React from 'react'
const Nav = () => {
    const isUserLoggedIn = true;
  return (
    
    <div className="navBar">
        <div className='navLeft'>
        <img href="/dashboard" src="/assets/icons/celesta_nav.svg"></img>
        <img href="/dashboard" src="/assets/icons/verdant_nav.svg"></img>
        </div>
        <img src="/assets/icons/typeface_nav.svg"></img>
        
            { !isUserLoggedIn?(
                <div className='navRight'>
                <button type='button' className='no_fill_btn' >Log In</button>
                <button type='button' className='no_fill_btn' href='./register'>Register</button>
                </div>
            ):(
                <p className='no_fill_btn' href="./">
                    Sign Out (CLT2003)
                </p>
            )}
    </div>
  )
}

export default Nav