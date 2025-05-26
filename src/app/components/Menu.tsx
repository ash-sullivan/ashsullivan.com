'use client';

import Link from 'next/link';

function MenuLinks() {
    return (
        <>
            <Link className="hover:underline" href="/">Home</Link>
            <Link className="hover:underline" href="/cats">Cats</Link>
            <Link className="hover:underline" href="/hobbies">Hobbies</Link>
        </>
    );
}

export default function Menu() {
    return (
        <div className="p-4">
            <div className="hidden md:flex gap-4">
                <MenuLinks />
            </div>
            <div className="md:hidden relative">
                <button
                    className="flex items-center"
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        menu?.classList.toggle('hidden');
                    }}
                >
                    <div className="text-3xl align-middle">☰</div>
                </button>
                <div id="mobile-menu" className="hidden absolute right-0 top-full mt-2 bg-linear-to-b from-violet-800 to-indigo-800 border rounded-lg shadow-lg p-4">
                    <div className="flex flex-col gap-4">
                        <MenuLinks />
                    </div>
                </div>
            </div>
        </div>
    )
};