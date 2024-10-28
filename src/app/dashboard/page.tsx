// 'use client';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import { NearContext } from '../../wallets/near'
import DashboardClient from '@/components/organisms/dashboard';
// import { useState,useContext,useEffect } from 'react';
export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  // const { signedAccountId, wallet } = useContext(NearContext);
  // const [action, setAction] = useState(() => { });
  // const [label, setLabel] = useState('Loading...');
  const {
    data: { user }
  } = await supabase.auth.getUser();
  // const {error } = await supabase
  // .from('user_data')
  // .select('id, created_at, firstname, lastname,email,password')
  // .eq('email', formData.email)
  // .eq('password', formData.password);
  if (!user ) {
    redirect('/signin');
  }
  // && !window.near?.getAccountId()
  

  return (
    <DashboardClient
      userId={user.id}
      email={user.email ?? ''}
      customerId={user?.user_metadata['sub'] ?? ''}
    />
  );
}
