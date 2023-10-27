"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import {signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = ({userStatus}) => {
    const userName= "DaleCLT2003";
    const isUserLoggedIn = userStatus;
    const [providers, setProviders]=useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(null);
  return (
    
    <nav className="flex-between w-full  ml-2 pr-8 pt-0.5 gap-2 z-50">
        <Link href="/">
      <Image src="/assets/icons/typeface_nav.svg"
          alt="NJATH Logo"
          width={180}
          height={50}
          className="object-contain mx-1 ml-2.5"
          />
          </Link>

      

      

      {/* Desktop Navigation */}
      <div className="max-lg:hidden flex">
        { isUserLoggedIn? (
          <div className="flex-end gap-0">
            <Link href="/dashboard" className="outline_btn">
            Levels</Link>
           
            <Link href="/leaderboard" className="outline_btn">
            Learderboard</Link>
            <Link href="/" className="outline_btn">
              Log Out ({userName})
            </Link>
            </div>
        ): (
          <div className="flex-end gap-3">
            <Link href="/login" className="outline_btn">
            Login</Link>
            <Link href="/register" className="black_btn">
            Register</Link>
            
          </div>
        )}

      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex relative">
          <div className="flex">
                <Image 
              src="/assets/icons/pajamas_hamburger.svg"
              width={37}
              height={37}
              className="px-1.5 mx-1 fill-njathgold"
              alt="profile"
              onClick={()=>setToggleDropDown((prev)=>!prev)}
                />
          </div>
        {
        isUserLoggedIn?(
        <>
          { toggleDropDown && (
            <div className="dropdown mr-3">
                <Link href="/dashboard"
                  className="dropdown_link border_outline_btn w-full hover:text-white font-bold"
                  onClick={()=>setToggleDropDown(false)}>
                  Levels </Link>
                
                <Link href="/leaderboard"
                  className="dropdown_link border_outline_btn w-full hover:text-white font-bold"
                  onClick={()=>setToggleDropDown(false)}>
                  Leaderboard
                </Link>
                <button type="button"
                    onClick={()=>{
                    setToggleDropDown(false);
                    signOut();
                    }}
                className="w-full black_btn hover:bg-njathbg hover:text-white">Log Out
                </button>
              </div>
            )} 
        </>
        )
        :(   
          <>            <div className="max-lg:hidden flex-center space-x-4">
            <button type="button" 
            className="border_outline_btn">
            LOG IN
            </button>         
            <button type="button" 
            className="black_btn  ">
            REGISTER
            </button>
            
            </div>
          
            <div className="lg:hidden flex-center space-x-4">
            { toggleDropDown && (
            <div className="dropdown mr-3 ">
                <Link href="/login"
                  className="dropdown_link w-full border_outline_btn hover:text-white"
                  onClick={()=>setToggleDropDown(false)}>
                  Login </Link>
                <Link href="/register" className="dropdown_link mt-1 w-full black_btn hover:bg-njathbg hover:text-white">
                  Register
                </Link>
              </div>
            )} 
            </div>
            </>

        )
        }
      </div>
    </nav>
  )}
  ;

export default Nav;