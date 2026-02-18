'use client'
import {useMediaQuery} from 'react-responsive'
import React, {useRef} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {useGSAP} from "@gsap/react";
import {SplitText, ScrollTrigger} from 'gsap/all'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger, SplitText)

const Hero = () => {
    const videoRef = useRef()
    const isMobile = useMediaQuery({maxWidth: 767})
    useGSAP(()=>{
        const heroSplit = new SplitText('.title', { type: 'chars, words'})
        const paraSplit = new SplitText('.subtitle', { type: 'lines'})

        heroSplit.chars.forEach((char)=> char.classList.add('text-gradient'))


        gsap.from(heroSplit.chars,{
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: '.05'
        })
        gsap.from(paraSplit.lines,{
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: '.06',
            delay: 1
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y:200 }, 0)
            .to('.left-leaf', { y:-200 }, 0)

        const startValue = isMobile ? "top 50%" : "center 60%"
        const endValue = isMobile ? "120% top" : "bottom top"

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })

        // ✅ Fix race condition — check if metadata is already available
        const setupVideo = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            })
        }

        if (videoRef.current.readyState >= 1) {
            setupVideo()  // metadata already loaded, run immediately
        } else {
            videoRef.current.onloadedmetadata = setupVideo  // wait for it
        }
    },[])
    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>MOJITO</h1>
                <Image src='/images/hero-left-leaf.png' alt="left-leaf" width={100} height={100} className='left-leaf'></Image>
                <Image src='/images/hero-right-leaf.png' alt="right-leaf" width={1000} height={100} className='right-leaf'></Image>
                <div className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p >Cool. Crisp. Classic.</p>
                            <p className='subtitle'>Sip the Spirit <br/> of Summer </p>
                        </div>
                        <div className='view-cocktails'>
                            <p className='subtitle'>Every cocktail on our menu is a blend of premium ingredients, creative
                                flair, and timeless recipes - designed to delight your senses.</p>
                            <Link href='#cocktails'>
                                View Cocktails
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            <div className='video absolute inset-0'>
                <video
                    ref={videoRef}
                    src='/videos/output.mp4'
                    muted
                    preload='auto'
                    playsInline
                />

            </div>
        </>
    );
};

export default Hero;