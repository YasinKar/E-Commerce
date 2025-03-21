import { deleteUserMessages } from '@/utils/actions/user.actions'
import { redirect } from 'next/navigation';

const page = async () => {
    await deleteUserMessages()

    redirect('/dashboard/messages');

    return null;
}

export default page