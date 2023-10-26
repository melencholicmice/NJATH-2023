"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import {signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const userName= "DaleCLT2003";
    const isUserLoggedIn = true;
    const [providers, setProviders]=useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(null);
  return (
    
    <nav className="flex-between w-full mb-6 pl-4 pt-2 gap-2">
      <Link href="/" className="logo_text flex-center gap-4 flex-center">
        <Image 
          src="/assets/Celesta-icon.svg"
          alt="NJATH Logo"
          width={50}
          height={50}
          className="object-contain grow-0"/>

          <Image src="/assets/icons/verdant_nav.svg"
          alt="Verdant Odyssey Logo"
          width={90}
          height={50}
          className="object-contain grow-0"
          />
      </Link>

      <Image src="/assets/icons/typeface_nav.svg"
          alt="NJATH Logo"
          width={100}
          height={50}
          className="object-contain"
          />
      

      

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        { isUserLoggedIn? (
          <div className="flex-end gap-0">
            <Link href="/" className="outline_btn">
            Levels</Link>
            <button type="button"  className="outline_btn">
              Rules
            </button><button type="button"  className="outline_btn">
              Leaderboard
            </button>
            <button type="button"  className="outline_btn">
              Log Out ({userName})
            </button>
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