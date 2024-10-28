'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import toast from 'react-hot-toast';

import FullScreenLoader from '@/components/full-screen-loader';
import LogoComponent from '@/components/logo';
import SuspenseWrapper from '@/components/suspense-wrapper';

const VerifyEmailComponent: React.FC = () => {
  const router = useRouter();
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();

  const [loading, setLoading] = React.useState(false);
  const [inputValues, setInputValues] = React.useState<string[]>(Array(4).fill(''));
  const [isButtonEnabled, setIsButtonEnabled] = React.useState(false);

  React.useEffect(() => {
    sendVerifyCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setIsButtonEnabled(inputValues.every((value) => value.length === 1));
  }, [inputValues]);

  const email = searchParams?.get('email');

  if (!email) {
    return notFound();
  }

  const sendVerifyCode = async (type = 'initial') => {
    if (type !== 'initial') {
      setLoading(true);
    }
    try {
      const response = await fetch('/api/send-verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (type === 'resend') {
        toast.success('Code Sent Successfully!');
      }
    } catch (error: unknown) {
      console.error('Code Sent Failed:', error);
      toast.error('Something went wrong :(');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (inputValues.length === 4) {
      const codes = inputValues.join('');

      setLoading(true);
      try {
        const response = await fetch('/api/verify-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: codes, email })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        toast.success('Verified Successfully!');
        router.push(`/`);
      } catch (error: unknown) {
        console.error('Code Verification Failed:', error);
        toast.error('Something went wrong :(');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Code is not correct');
    }
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 1) {
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);

      if (value.length === 1 && index < inputRefs.current.length - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(0, nextInput.value.length); // Select all text in the next input
        }
      }
    }
  };

  const setRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-slate-100 md:px-16 md:py-20">
      {loading && <FullScreenLoader />}
      <div className="flex flex-col w-full max-w-md md:max-w-lg">
        <LogoComponent />
        <section className="flex flex-col items-center pb-6 mt-10 bg-white rounded-2xl md:mt-16">
          <div className="flex flex-col justify-center items-start w-full rounded-2xl bg-slate-200">
            <div className="shrink-0 h-3.5 w-full rounded-2xl bg-[linear-gradient(153deg,#450DBD_25.22%,#DA12AE_95.6%)]" />
          </div>
          <div className="text-2xl mt-8 font-semibold text-slate-800 md:mt-12">
            Enter the code we sent to your email
          </div>
          <div className="mt-1 text-xs font-medium text-gray-400">
            This code will be valid for 5 minutes
          </div>
          <div className="flex gap-5 justify-center mt-8 w-full px-4 md:px-8">
            <input
              className="flex-1 p-2.5 bg-white rounded-lg border border-gray-300 text-center h-[81px] max-w-[62px]"
              ref={setRef(0)}
              maxLength={1}
              onChange={(e) => handleInputChange(0, e)}
            />
            <input
              className="flex-1 p-2.5 bg-white rounded-lg border border-gray-300 text-center h-[81px] max-w-[62px]"
              ref={setRef(1)}
              maxLength={1}
              onChange={(e) => handleInputChange(1, e)}
            />
            <input
              className="flex-1 p-2.5 bg-white rounded-lg border border-gray-300 text-center h-[81px] max-w-[62px]"
              ref={setRef(2)}
              maxLength={1}
              onChange={(e) => handleInputChange(2, e)}
            />
            <input
              className="flex-1 p-2.5 bg-white rounded-lg border border-gray-300 text-center h-[81px] max-w-[62px]"
              ref={setRef(3)}
              maxLength={1}
              onChange={(e) => handleInputChange(3, e)}
            />
          </div>
          <button
            className={`justify-center items-center p-2.5 mt-8 w-full max-w-[350px] text-base font-semibold text-white rounded-lg ${
              isButtonEnabled ? 'bg-violet-800' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isButtonEnabled}
            onClick={() => verifyCode()}
          >
            Verify
          </button>
          <p className="mt-8 text-base font-medium text-gray-600">
            Not received Code?{' '}
            <button className="text-blue-700" onClick={() => sendVerifyCode('resend')}>
              send again
            </button>
          </p>
        </section>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <SuspenseWrapper>
      <VerifyEmailComponent />
    </SuspenseWrapper>
  );
};

export default VerifyEmailPage;
