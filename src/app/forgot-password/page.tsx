'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import FullScreenLoader from '@/components/full-screen-loader';
import LogoComponent from '@/components/logo';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  })
});

type FormData = z.infer<typeof FormSchema>;

const ForgotPasswordComponent: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  });

  const resetPassword = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/update-password`
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset link sent to your email');
      }
    } catch (error: unknown) {
      console.error('Failed to send password reset link:', error);
      toast.error('Failed to send password reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-slate-100 md:px-16 md:py-20">
      {loading && <FullScreenLoader />}
      <div className="flex flex-col w-full max-w-md md:max-w-lg">
        <LogoComponent />
        <section className="flex flex-col items-center pb-6 mt-10 bg-white rounded-2xl md:mt-16">
          <h1 className="mt-8 text-3xl font-bold text-slate-800 md:mt-12 text-center">
            Forgot your password?
          </h1>
          <p className="mt-2 text-base font-medium text-gray-400 text-center w-full md:w-[453px]">
            Enter the email associated with this account and we will send an email with instructions
            to reset your password.
          </p>
          <form
            className="flex flex-col w-full px-4 mt-6 md:px-8"
            onSubmit={handleSubmit(resetPassword)}
          >
            <label htmlFor="emailInput" className="text-xs font-bold text-gray-600">
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
            <button
              type="submit"
              className="justify-center items-center p-2.5 mt-8 w-full text-base font-semibold text-white bg-violet-800 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
