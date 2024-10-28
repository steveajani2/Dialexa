import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import KnowledgeBaseClient from '@/components/organisms/knowledge-base-client';

const KnowledgeBasePage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }
  // const { data: items } = await supabase
    // .from('knowledge_base')
    // .select('id, title, description, created_at, language, availability')
  //   .eq('customer_id', user.user_metadata['sub']);
  const { data: items } = await supabase
  .from('user_data')
  .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
  .eq('user_id', user.id)


  return <KnowledgeBaseClient initialKnowledgeItems={items} userId={user.id} />;
};

export default KnowledgeBasePage;
