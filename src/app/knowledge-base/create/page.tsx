import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import toast from 'react-hot-toast';
import React from 'react';

import KnowledgeBaseCreate from '@/components/organisms/knowledge-base-create';

const KnowledgeBaseCreatePage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }


  return <KnowledgeBaseCreate userId={user?.id ?? ''} />;
};

export default KnowledgeBaseCreatePage;
