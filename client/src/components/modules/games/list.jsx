import React from "react";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";

const statuses = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

const projects = [
    {
        id: 1,
        name: 'Partie avec test@test.test',
        href: '#',
        status: 'Complete',
        createdBy: 'vous',
        dueDate: 'March 17, 2023',
        dueDateTime: '2023-03-17T00:00Z',
    },
    {
        id: 2,
        name: 'Partie avec test@test.test',
        href: '#',
        status: 'In progress',
        createdBy: 'test@test.test',
        dueDate: 'May 5, 2023',
        dueDateTime: '2023-05-05T00:00Z',
    },
    {
        id: 3,
        name: 'Partie avec test@test.test',
        href: '#',
        status: 'In progress',
        createdBy: 'test@tet.test',
        dueDate: 'May 25, 2023',
        dueDateTime: '2023-05-25T00:00Z',
    },
    {
        id: 4,
        name: 'Partie avec test@test.test',
        href: '#',
        status: 'In progress',
        createdBy: 'vous',
        dueDate: 'June 7, 2023',
        dueDateTime: '2023-06-07T00:00Z',
    },
    {
        id: 5,
        name: 'Partie avec test@test.test',
        href: '#',
        status: 'Archived',
        createdBy: 'vous',
        dueDate: 'June 10, 2023',
        dueDateTime: '2023-06-10T00:00Z',
    },
]

const MockList = () => {
    return <ul role="list" className="divide-y w-full divide-gray-100">
        {projects.map((project) => (
            <li key={project.id} className="flex w-full items-center justify-between gap-x-6 py-5">
                <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                        <p className="whitespace-nowrap">
                            Créé le <time dateTime={project.dueDateTime}>{project.dueDate}</time>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle r={1} cx={1} cy={1} />
                        </svg>
                        <p className="truncate">Créé par {project.createdBy}</p>
                    </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                    <Link to={`/games/${project.id}`}
                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                    >
                        Rejoindre la partie
                    </Link>
                    <Menu as="div" className="relative flex-none">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Plus d'options</span>
                            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <MenuItem>
                                <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                    Annuler la partie
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </li>
        ))}
    </ul>

}

const GamesList = () => {
    return (<div className="w-full">
        <div className="border-b border-gray-200 pb-12" >
            <h2 className="text-2xl my-4  font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Parties en cours
            </h2>

            <MockList />
        </div>
        <div className="border-b border-gray-200 pt-12 pb-12" >

            <h2 className="text-2xl my-4 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Parties terminées
            </h2>
            <MockList />
        </div>
    </div>)
}

export default GamesList
