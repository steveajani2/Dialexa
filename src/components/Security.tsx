'use client';

import { format, isValid } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect, useContext } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NearContext } from '../wallets/near';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';

// Zod schema for form validation
const FormSchema = z.object({
  newpassword: z.string().min(5, 'Ensure your password is more than 5 characters'),
  confirmpassword: z.string().min(5, 'Ensure your password is more than 5 characters'),
});

type FormData = z.infer<typeof FormSchema>;

interface BasicInfoProps {
  userId: string;
}

const Security: React.FC<BasicInfoProps> = ({ userId }) => {
  const [is2FAEnabled, set2FAEnabled] = useState(false);
  const supabase = createClientComponentClient();
  const { signedAccountId } = useContext(NearContext);
  const [profileCompletion, setProfileCompletion] = useState<any | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
 
    if (signedAccountId) {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', userId)
        .eq('wallet_id', signedAccountId)

        setProfileCompletion(items[0])
      //  console.log(items)
      }
      handleResize()
    }else {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id',userId)
        setProfileCompletion(items[0])
    
       
      }
      handleResize()
    }
 
  }, [])

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      if (formData.newpassword === formData.confirmpassword) {
        const { error } = await supabase.auth.updateUser({
          password: formData.newpassword,
        });

        if (error) {
          console.error('Error updating password:', error);
          alert('Failed to update password: ' + error.message);
        } else {
          alert('Password updated successfully!');
          reset(); // Clear the form after a successful update
        }
      } else {
        alert('Passwords do not match. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <main className="flex-1 p-8">
      {/* Two-Factor Authentication Section */}
      <section 
  className="bg-white p-6 rounded-lg shadow mb-8 opacity-50 pointer-events-none"
  style={{ filter: 'grayscale(100%)' }} // Optional grayscale effect
>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold" style={{ fontFamily: 'Work Sans' }}>
      Two-Factor Authentication (Coming soon)
    </h2>
    <button
      onClick={() => set2FAEnabled(!is2FAEnabled)}
      className={`px-4 py-2 rounded-lg ${
        is2FAEnabled ? 'bg-red-500' : 'bg-purple-600'
      } text-white`}
      style={{ fontFamily: 'Work Sans' }}
    >
      {is2FAEnabled ? 'Turn Off' : 'Turn On'}
    </button>
  </div>
  
  <p className="text-gray-500 mb-4" style={{ fontFamily: 'Work Sans' }}>
    Two-factor authentication is currently {is2FAEnabled ? 'enabled' : 'off'}.
  </p>

  <div className="space-y-4">
    <AuthOption title="Authentication App" description="Google Auth app" />
    <AuthOption title="Email" description="An email to send verification link" />
    <AuthOption title="SMS Recovery" description="A phone number for verification" />
  </div>
</section>


{profileCompletion?.email === "ebusogbodo432@gmail.com" ? 
      <section  style={{ filter: 'grayscale(100%)' }} className="bg-white p-6 rounded-lg shadow opacity-50">
      <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Work Sans' }}>
        Password (Account created using wallet connect )
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput2 label="New Password" register={register('newpassword')} error={errors.newpassword} />
        <PasswordInput2 label="Confirm Password" register={register('confirmpassword')} error={errors.confirmpassword} />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full"
          style={{ fontFamily: 'Work Sans' }}
          disabled={true}
        >
          {isSubmitting ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </section>: 
          <section   className="bg-white p-6 rounded-lg shadow ">
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Work Sans' }}>
            Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput label="New Password" register={register('newpassword')} error={errors.newpassword} />
            <PasswordInput label="Confirm Password" register={register('confirmpassword')} error={errors.confirmpassword} />
  
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full"
              style={{ fontFamily: 'Work Sans' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </section>

    }

    </main>
  );
};

interface AuthOptionProps {
  title: string;
  description: string;
}

const AuthOption: React.FC<AuthOptionProps> = ({ title, description }) => (
  <div className="flex justify-between items-center border p-4 rounded-lg">
    <div>
      <h3 className="font-semibold" style={{ fontFamily: 'Work Sans' }}>{title}</h3>
      <p className="text-sm text-gray-500" style={{ fontFamily: 'Work Sans' }}>{description}</p>
    </div>
    <button
      className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg"
      style={{ fontFamily: 'Work Sans' }}
    >
      Setup
    </button>
  </div>
);

interface PasswordInputProps {
  label: string;
  register: ReturnType<typeof register>;
  error?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, register, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Work Sans' }}>
      {label}
    </label>
    <input
      type="password"
      {...register}
      className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
        error ? 'border-red-500' : ''
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const PasswordInput2: React.FC<PasswordInputProps> = ({ label, register, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Work Sans' }}>
      {label}
    </label>
    <input
      type="password"
      readOnly
      {...register}
      className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-0 focus:ring-purple-600 ${
        error ? 'border-red-500' : ''
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default Security;
