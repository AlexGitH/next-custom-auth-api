import Link from 'next/link';
import Logout from './logout';

export default function Navbar({ session }: { session: any }) {
  return (
    <nav className='flex flex-row gap-5 mx-2 max-w-md mt-5'>
      {!!session && <Logout session={session} />}
      {!session && <Link href="/">Sign In</Link>}
      {!session && <Link href="/register">Sign Up</Link>}
    </nav>
  );
}