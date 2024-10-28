import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Settings from '@/components/Settings';

const Settingspage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data: items } = await supabase
  .from('user_data')
  .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
  .eq('user_id', user.id)
  // .eq('wallet_id', user.user_metadata['sub'])

  // const { data: items } = await supabase
  //   .from('ai_agents')
  //   .select('id, name, phone_number, created_at, language, voice, status')
  //   .eq('customer_id', user.user_metadata['sub'])
  //   .eq('wallet_id', items2.wallet_id)

  return <Settings  userId={user.id} />;
};

export default Settingspage;
