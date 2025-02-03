import DashboardSidebar from "@/components/DashboardSidebar";
import { getUser } from "@/utils/actions/user.actions";

export default async function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const user = await getUser()

    return (
        <div className='flex'>
            <DashboardSidebar user={user} />
            <div className='w-full p-5'>
                {children}
            </div>
        </div>
    );
}