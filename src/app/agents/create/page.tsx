import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import AgentCreate from '@/components/organisms/agent-create';

const AgentCreatePage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();


  const { data: items } = await supabase
  .from('ai_agents')
  .select('id, name, phone_number, created_at, language, voice, status')
  .eq('user_id', user?.id)

  if (!user) {
    redirect('/signin');
  }

  return <AgentCreate userId={user.id} itemlength= {items?.length > 0 ? items?.length : 0} />;
};

export default AgentCreatePage;
