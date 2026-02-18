'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image"
import {navLinks} from "../../../constants";
import {useGSAP} from "@gsap/react";
import gsap from "gsap"

const NavBar = () => {
    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: "bottom top" //animation starts when the bottom of the navbar reached the top of the viewport
            }
        })
        navTween.fromTo('nav', {backgroundColor: 'transparent'},{backgroundColor: '00000050', backgroundFilter: 'blur(10px )'})
    }, [])
    return (
        <nav>
            <div>
                <Link href="/home" className={"flex items-center gap-2"}>
                    <Image src="/images/logo.png" alt="logo" width={30} height={100} />
                    <p>Velvet Pour</p>
                </Link>
                <ul>
                    {navLinks.map((link)=>(
                        <li key={link.id}>
                            <Link href={link.title}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </nav>
    );
};

export default NavBar;