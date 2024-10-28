'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import FullScreenLoader from '@/components/full-screen-loader';
import LogoComponent from '@/components/logo';
import SuspenseWrapper from '@/components/suspense-wrapper';

const FormSchema = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm Password must be at least 8 characters long.' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'] // Set the path of the error to 'confirmPassword'
  });

type FormData = z.infer<typeof FormSchema>;

const ResetPasswordComponent: React.FC = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [loading, setLoading] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  async function resetPassword(formData: FormData) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset successfully');
        router.push('/signin');
      }
    } catch (error: unknown) {
      console.error('Failed to reset password:', error);
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-slate-100 md:px-16 md:py-20">
      {loading && <FullScreenLoader />}
      <div className="flex flex-col w-full max-w-md md:max-w-lg">
        <LogoComponent />
        <section className="flex flex-col items-center pb-6 mt-10 bg-white rounded-2xl md:mt-16">
          <h1 className="mt-8 text-3xl font-bold text-slate-800 md:mt-12">Create new password</h1>
          <p className="mt-2 text-base font-medium text-gray-400 text-center w-full md:w-[453px]">
            Try creating a new password different from the old one you had.
          </p>
          <form
            className="flex flex-col w-full px-4 mt-6 md:px-8"
            onSubmit={handleSubmit(resetPassword)}
          >
            <label htmlFor="passwordInput" className="text-xs font-bold text-gray-600">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-5 justify-between p-2.5 mt-1 text-xs text-gray-400 bg-white rounded-lg border border-gray-300">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="passwordInput"
                placeholder="Enter your password"
                aria-label="Password"
                className="flex-1 bg-transparent outline-none"
                {...register('password')}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                <Image
                  loading="lazy"
                  src={
                    passwordVisible
                      ? '/assets/icon-visibility-off.svg'
                      : '/assets/icon-visibility.svg'
                  }
                  alt={passwordVisible ? 'Hide password' : 'Show password'}
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              </button>
            </div>
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}

            <label htmlFor="confirmPasswordInput" className="mt-4 text-xs font-bold text-gray-600">
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-5 justify-between p-2.5 mt-1 text-xs text-gray-400 bg-white rounded-lg border border-gray-300">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPasswordInput"
                placeholder="Confirm your password"
                aria-label="Confirm Password"
                className="flex-1 bg-transparent outline-none"
                {...register('confirmPassword')}
              />
              <button type="button" onClick={toggleConfirmPasswordVisibility}>
                <Image
                  loading="lazy"
                  src={
                    confirmPasswordVisible
                      ? '/assets/icon-visibility-off.svg'
                      : '/assets/icon-visibility.svg'
                  }
                  alt={confirmPasswordVisible ? 'Hide password' : 'Show password'}
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-600">{errors.confirmPassword.message}</span>
            )}

            <button
              type="submit"
              className="justify-center items-center p-2.5 mt-8 w-full text-base font-semibold text-white bg-violet-800 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <SuspenseWrapper>
      <ResetPasswordComponent />
    </SuspenseWrapper>
  );
};

export default ResetPasswordPage;
