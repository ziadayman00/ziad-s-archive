import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className="relative group">
      <Link href="/" className="cursor-pointer block transition-transform duration-300 hover:scale-105">
        <Image
          src="/logo.svg" 
          width={150} 
          height={150} 
          alt="Ziad's Archive Logo"
          className="logo-recolor"
        />
      </Link>
      
      <style jsx>{`
        :global(.logo-recolor) {
          /* Convert creamy (#fafbd7) to light beige (#e8e6e0) */
          filter: brightness(0.92) saturate(0.5) hue-rotate(10deg);
        }
      `}</style>
    </div>
  );
};

export default Logo
