'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { NearContext } from '../../wallets/near'
import { useState,useContext,useEffect } from 'react';

import FullScreenLoader from '@/components/full-screen-loader';
import LogoComponent from '@/components/logo';

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: 'Firstname must be at least 2 characters.'
  }),
  lastname: z.string().min(2, {
    message: 'Lastname must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
});

type FormData = z.infer<typeof FormSchema>;
//cryptousers1234
//ebusogbodo432@gmail.com
export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');
  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Disconnect ${signedAccountId}`);
      signIn2()
    } else {
      setAction(() => wallet.signIn);
      setLabel('Connect wallet');
    }
  }, [signedAccountId, wallet]);

  const signIn2 = async () => {
    try {
      setLoading(true);
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: 'ebusogbodo432@gmail.com',
        password: "cryptousers1234" //"cryptousers1234"
      });
   
      if (error) {
        throw new Error(error.message);
      }

      // toast.success('Login Successfully');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(`Login Failed: ${error || ''}`);
      console.error('Login Failed Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  });

  async function signUp(formData: FormData) {
    const supabase = createClientComponentClient();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { firstname: formData.firstname , lastname: formData.lastname} }
      });
     await supabase
      .from('user_data')
      .insert(
        { firstname : formData.firstname, lastname: formData.lastname, email: formData.email  }
      );

      if (error) {
        console.error('SignUp Failed:', error);
        throw error;
      }
      toast.success('SignUp Successfully. Please check your inbox to confirm the email address');

      router.push('/signin');
      router.refresh();
    } catch (error) {
      toast.error('SignUp Failed');
      console.error('SignUp Failed Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-slate-100 md:px-16 md:py-20">
      {loading && <FullScreenLoader />}
      <div className="flex flex-col w-full max-w-md md:max-w-lg">
        <LogoComponent />
        <section className="flex flex-col items-center pb-6 mt-10 bg-white rounded-2xl md:mt-16">
          <div className="flex flex-col justify-center items-start self-stretch rounded-2xl bg-slate-200 w-full">
            <div className="shrink-0 h-3.5 rounded-2xl bg-[linear-gradient(153deg,#450DBD_25.22%,#DA12AE_95.6%)] w-[50%]" />
          </div>
          <h1 className="mt-8 text-3xl font-bold text-slate-800 md:mt-12">Create your account</h1>
          <p className="mt-2 text-base font-medium text-gray-600">Let’s get you started</p>
          <div className="flex flex-col gap-4 mt-8 w-full px-4 md:px-8">
            <button  onClick={action}  className="bg-violet-800 flex gap-2.5 justify-center p-2.5 rounded-lg bg-slate-200 w-full text-base font-semibold text-white">
            <Image src="/assets/icon_rev.svg" alt="Google logo" width={25} height={25} />
             
             {label}
            </button>
            {/* <button className="flex gap-2.5 justify-center p-2.5 rounded-lg bg-slate-200 w-full">
              <Image src="/assets/icon-apple.svg" alt="Apple logo" width={20} height={20} />
              Sign up with Apple
            </button> */}
          </div>
          <div className="flex gap-4 justify-center items-center mt-8 w-full px-4 md:px-8">
            <div className="flex-grow h-px bg-gray-300" />
            <div className="text-xl font-semibold text-gray-600">OR</div>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <form className="flex flex-col w-full px-4 mt-6 md:px-8" onSubmit={handleSubmit(signUp)}>
            <label htmlFor="nameInput" className="text-xs font-bold text-gray-600">
              First Name<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-5 justify-between p-2.5 mt-1 text-xs text-gray-400 bg-white rounded-lg border border-gray-300 mb-4">
              <input
                type="text"
                id="nameInput"
                placeholder="Enter your name"
                aria-label="Name"
                className="flex-1 bg-transparent outline-none"
                {...register('firstname')}
              />
            </div>
            {errors.firstname && <span className="text-red-600">{errors.firstname.message}</span>}


            <label htmlFor="nameInput" className="text-xs font-bold text-gray-600">
              Last Name<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-5 justify-between p-2.5 mt-1 text-xs text-gray-400 bg-white rounded-lg border border-gray-300">
              <input
                type="text"
                id="nameInput"
                placeholder="Enter your name"
                aria-label="Name"
                className="flex-1 bg-transparent outline-none"
                {...register('lastname')}
              />
            </div>
            {errors.lastname && <span className="text-red-600">{errors.lastname.message}</span>}



            <label htmlFor="emailInput" className="mt-4 text-xs font-bold text-gray-600">
              Email<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-5 justify-between p-2.5 mt-1 text-xs text-gray-400 bg-white rounded-lg border border-gray-300">
              <input
                type="email"
                id="emailInput"
                placeholder="Enter your email"
                aria-label="Email"
                className="flex-1 bg-transparent outline-none"
                {...register('email')}
              />
            </div>
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            <label htmlFor="passwordInput" className="mt-4 text-xs font-bold text-gray-600">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-5 justify-between p-2.5 mt-1 text-xs text-gray-400 bg-white rounded-lg border border-gray-300">
              <input
                type="password"
                id="passwordInput"
                aria-label="Password"
                placeholder="Enter your password"
                className="flex-1 bg-transparent outline-none"
                {...register('password')}
              />
              <Image
                loading="lazy"
                src="/assets/icon-visibility.svg"
                alt="Toggle visibility"
                width={20}
                height={20}
                className="shrink-0"
              />
            </div>
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
            <div className="flex gap-2 justify-start py-0.5 mt-4 text-xs font-bold text-gray-600">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="ml-2">
                I agree to all Terms and conditions
              </label>
            </div>
            <button
              type="submit"
              className="justify-center items-center p-2.5 mt-8 w-full text-base font-semibold text-white bg-violet-800 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-8 text-base font-medium text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-700">
              Sign In
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
