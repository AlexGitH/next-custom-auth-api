'use client';
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function Logout({session}:{session?:any}) {
  console.log('Logout',{session})
  const { push, refresh } = useRouter();
  return <button onClick={() => axios.post('/api/auth/logout')
    .then(x => {
      console.log('LOGGING OUT...')
      push('/');
      refresh();
    })}>
    Logout
  </button>
}