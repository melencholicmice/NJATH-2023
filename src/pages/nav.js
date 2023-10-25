"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import {signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = false;
    const [providers, setProviders]=useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    
    <nav className="flex-between w-full mb-16 pt-2 gap-10">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/Celesta-icon.svg"
          alt="NJATH Logo"
          width={50}
          height={50}
          className="object-contain"/>

          <Image src="/assets/icons/verdant_nav.svg"
          alt="Verdant Odyssey Logo"
          width={90}
          height={50}
          className="object-contain "
          />
          <Image src="/assets/icons/typeface_nav.svg"
          alt="NJATH Logo"
          width={150}
          height={50}
          className="object-contain grow"
          />
      </Link>
      

      

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        { isUserLoggedIn? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/" className="black_btn">
            Create Post</Link>
            <button type="button"  className="outline_btn">
        Sign Out
      </button>
      <Link href="/profile">
        <Image
          src="/assets/NJATH.svg"
          width={50}
          height={37}
          className="rounded-full"
          alt="profile"/>
      </Link>
          </div>
        ): (
          <>
            
          </>
        )}

      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
        isUserLoggedIn?(
          <div className="flex">
            <Image
          src="/assets/NJATH.svg"
          width={37}
          height={37}
          className="rounded-full"
          alt="profile"
          onClick={()=>setToggleDropDown((prev)=>!prev)}
            />

        {toggleDropDown && (
          <div className="dropdown">
            <Link href="/profile"
            className="dropdown_link"
            onClick={()=>setToggleDropDown(false)}>
            My Profile
            </Link>
            <Link href="/create-prompt"
            className="dropdown_link"
            onClick={()=>setToggleDropDown(false)}>
            Create Prompt
            </Link>
            <button type="button"
            onClick={()=>{
              setToggleDropDown(false);
              signOut();
            }}
            className="mt-5 w-full black_btn">Sign Out</button>
          </div>
        )}
          </div>

        )
        :(   
            <div className="sm:hidden flex-center space-x-4">
            <button type="button" 
            className="outline_btn">
            LOG IN
            </button>         
            <button type="button" 
            className="black_btn">
            REGISTER
            </button>
            
            </div>
        )
        }
      </div>
    </nav>
  )}
  ;

export default Nav;