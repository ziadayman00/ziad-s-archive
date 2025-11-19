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
        />
      </Link>
    </div>
  );
};

export default Logo
