import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { CLIENTS } from 'src/mockdata/clients';

import ClientPageComponent from '@/components/organisms/client-page';

const ClientPage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }
  // const { data: items } = await supabase
  //   .from('clients')
  //   .select('id, name, phone_number, address, date_created')
  //   .eq('customer_id', user.user_metadata['customer_id']);

  return <ClientPageComponent clientItems={CLIENTS} />;
};

export default ClientPage;
