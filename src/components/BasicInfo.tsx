'use client';

import { format, isValid } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NearContext } from '../wallets/near';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import FullScreenLoader from '@/components/full-screen-loader';

const FormSchema = z.object({
  firstname: z.string().min(0, 'First name is required'),
  lastname: z.string().min(0, 'Last name is required'),
  businessname: z.string().min(0, 'Business name is required'),
  city: z.string().min(0, 'City is required'),
  country: z.string().min(0, 'Country is required'),
  phonenumber: z.string().min(0, 'Phone number is required'),
});

type FormData = z.infer<typeof FormSchema>;

interface BasicInfoProps {
  userId: string;
}

const Basicinfo: React.FC<BasicInfoProps> = ({ userId }) => {
  const [profileCompletion, setProfileCompletion] = useState<any | null>(null);
  const supabase = createClientComponentClient();
  const { signedAccountId } = useContext(NearContext);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const query = supabase
  //       .from('user_data')
  //       .select('id, first_name, last_name, created_at, Business_Name, City, Country, Phone_Number, wallet_id')
  //       .eq('user_id', userId);

  //     if (signedAccountId) query.eq('wallet_id', signedAccountId);

  //     const { data, error } = await query.single();

  //     if (error) {
  //       console.error('Error fetching profile:', error);
  //     } else {
  //       setProfileCompletion(data);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [supabase, signedAccountId, userId]);
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
 console.log(userId)
 //93eadb93-7ca0-441f-a60c-bdf796edd5e0
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      businessname: '',
      city: '',
      country: '',
      phonenumber: '',
    },
  });

  useEffect(() => {
    if (profileCompletion) {
      reset({
        firstname: profileCompletion?.first_name || '',
        lastname: profileCompletion?.last_name || '',
        businessname: profileCompletion?.Business_Name || '',
        city: profileCompletion?.City || '',
        country: profileCompletion?.Country || '',
        phonenumber: profileCompletion?.Phone_Number || '',
      });
    }
  }, [profileCompletion, reset]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const query = supabase
        .from('user_data')
        .update({
          first_name: formData.firstname,
          last_name: formData.lastname,
          Business_Name: formData.businessname,
          City: formData.city,
          Country: formData.country,
          Phone_Number: formData.phonenumber,
        })
        .eq('user_id', userId);

      if (signedAccountId) query.eq('wallet_id', signedAccountId);

      const { error } = await query;

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <main className="flex-1 p-8">
      {isSubmitting && <FullScreenLoader />}
      <section className="flex flex-col px-20 py-5 gap-6 bg-white rounded-lg max-md:px-5 max-md:max-w-full mb-12">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image
              loading="lazy"
              src="/assets/face.svg"
              alt="face"
              width={120}
              height={120}
              style={{ marginBottom: 20 }}
            />
            <h1 className="text-2xl font-semibold text-center" style={{ fontFamily: 'Work Sans' }}>
              {profileCompletion?.first_name || 'No name'}
            </h1>
          </div>
        </div>

        {/* Newly Added Section */}
        <div className="flex flex-wrap justify-center gap-10 mt-6 w-full max-w-5xl">
          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span
                className="font-semibold text-sm"
                style={{ color: '#8F94A8', fontFamily: 'Work Sans' }}
              >
                Business Name
              </span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span
                className="text-sm text-blue-600 ml-0"
                style={{ color: '#435060', fontFamily: 'Work Sans' }}
              >
                {profileCompletion?.Business_Name || 'Nill'}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span
                className="font-semibold text-sm"
                style={{ color: '#8F94A8', fontFamily: 'Work Sans' }}
              >
                Location
              </span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span
                className="text-sm text-blue-600 ml-0"
                style={{ color: '#435060', fontFamily: 'Work Sans' }}
              >
                {profileCompletion?.City || 'Nill'} {profileCompletion?.Country}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span
                className="font-semibold text-sm"
                style={{ color: '#8F94A8', fontFamily: 'Work Sans' }}
              >
                Date Joined
              </span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span
                className="text-sm text-blue-600 ml-0"
                style={{ color: '#435060', fontFamily: 'Work Sans' }}
              >
                {profileCompletion?.created_at &&
                isValid(new Date(profileCompletion.created_at))
                  ? format(new Date(profileCompletion.created_at), 'yyyy-MM-dd')
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Work Sans' }}>
          Account Information
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                First Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                {...register('firstname')}
              />
              {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                {...register('lastname')}
              />
              {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Work Sans' }}>
              Business Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              {...register('businessname')}
            />
            {errors.businessname && <span className="text-red-500">{errors.businessname.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                City of Residence
              </label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" {...register('city')} />
              {errors.city && <span className="text-red-500">{errors.city.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                Country of Residence
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                {...register('country')}
              />
              {errors.country && <span className="text-red-500">{errors.country.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Work Sans' }}>
              Phone Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              {...register('phonenumber')}
            />
            {errors.phonenumber && <span className="text-red-500">{errors.phonenumber.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto py-2 px-4 bg-purple-600 text-white rounded-md"
          >
            Update Profile
          </button>
        </form>
      </section>
    </main>
  );
};

export default Basicinfo;
