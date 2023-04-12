'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarProps{
  src: string | null | undefined
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="rounded-full" 
      src={src || "/images/placeholder.jpg"}
      height="30" 
      width="30" 
      alt="Avatar" 
    />
   );
}
 
export default Avatar;