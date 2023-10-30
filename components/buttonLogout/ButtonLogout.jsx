import { auth } from "@/firebase"
import { useRouter } from 'next/navigation';

export const ButtonLogout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('userData');
            router.push('/');
            console.log('Sesión cerrada');
        } catch (error) {
            console.log('Error al cerrar sesión:', error);
        }
    }
    

  return (
    <div>
        <button onClick={handleLogout}>Log out</button>
    </div>
  )
}
