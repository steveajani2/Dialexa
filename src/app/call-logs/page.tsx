import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { CALL_LOGS } from 'src/mockdata/call-logs';

import CallLogsClient from '@/components/organisms/call-logs-client';

const CallLogsPage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }
  // const { data: items } = await supabase
  //   .from('call_logs')
  //   .select('id, client_name, phone_number, category, details, date, call_type, duration')
  //   .eq('customer_id', user.user_metadata['customer_id']);

  return <CallLogsClient callLogItems={CALL_LOGS} userId={user.id} />;
};

export default CallLogsPage;
