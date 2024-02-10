import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

export default function Dashboard({ auth, contact }) {
    const { register, getValues } = useForm({
        defaultValues: {
            id: contact?.id ?? '' ,
            name: contact?.name ?? '',
            contact: contact?.contact ?? '',
            email: contact?.email ?? '',
        },
    });

    const updateContact = () => {
        axios.patch(route('contact.update', { contact: getValues().id }), getValues()).then((response) =>
            alert(response.data)).catch((error) => alert(JSON.stringify(error.response.data)));
    }

    const createContact = () => {
        axios.put(route('contact.create'), getValues()).then((response) =>
            alert(response.data)).catch((error) => alert(error.response.data));
    }

    const submit = (e) => {
        e?.preventDefault();
        contact ? updateContact() : createContact();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div >
                            <input {...register('name')}  placeholder='name'/>
                            <input {...register('contact')}  placeholder='contact'/>
                            <input {...register('email')}  placeholder='email' />
                            <button className='bg-blue-500' onClick={submit}>{contact ? 'Update' : 'Create'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
