import Image from 'next/image';
export default function Fish() {
    return (
        <Image
            src="/fishing/feesh.png"
            alt="Feesh"
            width={32}
            height={32} 
        />
    );
}