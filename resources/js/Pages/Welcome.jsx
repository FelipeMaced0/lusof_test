import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, contacts }) {
    
    const deleteContact = (id) => {
        axios.delete(route('contact.delete', {contact:id}))
        .then((response) => alert(JSON.stringify(response.data)))
        .catch((error)  => alert(JSON.stringify(error.response.data)));

    }

    const createContact = () => {
        axios.put(route('contact.create', {contact:'123456789', email: 'f@f.com', name:'ferdinaod'}))
        .then((response) => alert(JSON.stringify(response.data)))
        .catch((error)  => alert(JSON.stringify(error.response.data)));

    }

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8 flex flex-col items-center">
                <h1>Available Contacts</h1>
                    {contacts?.map((contact) => 
                        <>
                            <div className='border border-red-500 w-[60rem] flex flex-row justify-around h-52 overflow-auto'>
                                <span>{contact.name}</span>
                                <span>{contact.contact}</span>
                                <span>{contact.email}</span>
                                <button className='bg-blue-500' onClick={() => {deleteContact(contact.id)}}>Delete</button>
                                <button className='bg-blue-500' onClick={() => {createContact()}}>create</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
