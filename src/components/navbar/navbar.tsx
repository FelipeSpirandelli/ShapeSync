import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const NavbarComponent: React.FC = () => {

    const links = [
        {"name": "Cronograma", "url": "/cronograma"},
        {"name": "Nutrição", "url": "/nutricao"},
        {"name": "Dashboard", "url": "/dashboard"},
    ]

    return (
        <nav className="bg-azul_escuro text-red p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Image src="./logo_com_texto.svg" alt="logo" width={200} height={50} />

                <div className="space-x-4 flex flex-row text-whote">
                    {links.map(({ name, url }) => {
                        return (
                            <Link href={url}>
                                <p className='text-lg text-white font-medium'>{name}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;