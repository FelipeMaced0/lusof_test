import { Link, Head, router } from '@inertiajs/react';

export default function Welcome({ auth, contacts }) {

    const deleteContact = (id) => {
        axios.delete(route('contact.delete', { contact: id }))
            .then((response) => {
                alert(JSON.stringify(response.data));
                router.reload();
            })
            .catch((error) => alert(JSON.stringify(error.response.data)));

    }

    const editContact = (id) => {
        router.get(route('contact.edit', { contact: id }));
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

                <div className="max-w-7xl mx-auto p-6 lg:p-8 flex flex-col items-center overflow-auto gap-y-5">
                    <h1 className='font-bold'>Available Contacts</h1>
                    {contacts?.map((contact) =>
                        <>
                            <div className='w-[60rem] flex flex-row justify-around h-10'>
                                <div className='w-[40rem] flex flex-row gap-x-5'>
                                    <span>{contact.name}</span>
                                    <span>{contact.contact}</span>
                                    <span>{contact.email}</span>
                                </div>
                                <div className='w-32 flex flex-row gap-x-5'>
                                    <button className='bg-red-500 shadow-lg rounded p-2 hover:bg-red-400' onClick={() => { deleteContact(contact.id) }}>Delete</button>
                                    <button className='bg-blue-500 shadow-lg rounded p-2 hover:bg-blue-400' onClick={() => { editContact(contact.id) }}>Edit</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
