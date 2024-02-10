import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { notification } from 'antd';
import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

export default function Dashboard({ auth, contact }) {
    const createSchema = z.object({
        id: z.number().int().positive().optional(),
        name: z.string().min(5).max(255),
        email: z.string().email().max(255),
        contact: z.string().refine((value) => value.match(/^\d{9}$/g)?.length > 0)
    });

    const { register, getValues, formState: { errors }, trigger } = useForm({
        defaultValues: {
            id: contact?.id ?? '',
            name: contact?.name ?? '',
            contact: contact?.contact ?? '',
            email: contact?.email ?? '',
        },
        mode: 'all',
        resolver: zodResolver(createSchema)
    });

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (message, description, type) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const updateContact = () => {
        axios.patch(route('contact.update', { contact: getValues().id }), getValues()).then((response) => {
            openNotificationWithIcon('Success', response.data, 'success');
        }).catch((error) => {
            openNotificationWithIcon('Error', JSON.stringify(error.response.data.message), 'error');
        });
    }

    const createContact = () => {
        axios.put(route('contact.create'), getValues()).then((response) => {

            openNotificationWithIcon('Success', response.data, 'success');
        }).catch((error) => {
            openNotificationWithIcon('Error', JSON.stringify(error.response.data.message), 'error');
        });
    }

    const submit = (e) => {
        e?.preventDefault();
        trigger();
        contact ? updateContact() : createContact();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {contextHolder}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col justify-center">
                        <div className='flex flex-row gap-x-3' >
                            <input {...register('name')} placeholder='name' className='rounded' />
                            <input {...register('contact')} placeholder='contact' className='rounded' />
                            <input {...register('email')} placeholder='email' className='rounded' />
                            <button className='bg-blue-500 shadow-lg rounded p-2 hover:bg-blue-400' onClick={submit}>{contact ? 'Update' : 'Create'}</button>
                        </div>
                        <div className='text-red-500 w-[40rem] flex flex-col justify-between'>
                            <ErrorMessage name='name' errors={errors} /> 
                            <ErrorMessage name='contact' errors={errors} />
                            <ErrorMessage name='email' errors={errors} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
