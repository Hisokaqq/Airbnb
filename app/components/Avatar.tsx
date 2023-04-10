'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Avatar = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="rounded-full" 
      src={"/images/placeholder.jpg"}
      height="30" 
      width="30" 
      alt="Avatar" 
    />
   );
}
 
export default Avatar;