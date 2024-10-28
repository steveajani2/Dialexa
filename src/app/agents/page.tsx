import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Agents from '@/components/organisms/agents';

const AgentsPage: React.FC = async () => {
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

  return <Agents initialAgentsItems2={items} userId={user.id} />;
};

export default AgentsPage;
