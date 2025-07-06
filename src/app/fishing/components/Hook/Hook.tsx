import Image from 'next/image';


/* 
  https://www.flaticon.com/free-icons/fish-hook
  Fish hook icons created by PIXARTIST - Flaticon
*/

export default function Fish() {
    return (
        <Image
            src="/fishing/fish-hook.png"
            alt="Fish hook"
            width={32}
            height={32} 
        />
    );
}