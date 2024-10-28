'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState, useCallback,useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CiCircleInfo } from 'react-icons/ci';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { NearContext } from '../../wallets/near'
import FullScreenLoader from '@/components/full-screen-loader';

const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string()
});

type FormData = z.infer<typeof FormSchema>;

interface KnowledgeBaseCreateProps {
  userId: string;
}

const KnowledgeBaseCreate: React.FC<KnowledgeBaseCreateProps> = ({ userId }) => {
  const router = useRouter();

  const [availability, setAvailability] = useState(false);
  const [file, setFile] = useState<File | null>(null);
const { signedAccountId, wallet } = useContext(NearContext);
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });



  const saveSource = async (formData: FormData) => {
    try {
      // Check if there's a file to upload
      if (file) {
        const form = new FormData();
        form.append("file", file);

        const response = await fetch('https://api.vapi.ai/file', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer 8398609e-b62a-4a20-b508-a94a7b839c7f'
          },
          body: form
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'File upload failed');
        }

        // Proceed with saving data to Supabase after file upload
        const { error } = await supabase
          .from('knowledge_base')
          .insert({
            title: formData.title,
            description: formData.description,
            user_id: userId,
            wallet_id: signedAccountId,
            file_url: result.file_url, // Add file URL or ID here if needed
            file_id : result.id,
            availability: availability
          });

        if (error) throw error;

        toast.success('New Knowledge Base Added');
        router.push('/knowledge-base');
        router.refresh();
      } else {
        toast.error('Please upload a file before submitting.');
      }
    } catch (error: unknown) {
      console.error('Failed to add new Knowledge Base:', error);
      toast.error('Failed to add new Knowledge Base');
    }
  };

  const onAvailabilityChange = () => {
    setAvailability(!availability);
  };


  interface FileUploadProps {
    onFilesAdded: (files: File[]) => void;
  }

  const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded }) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
        if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
      },
      [onFilesAdded]
    );
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: true,
    });


  
    return (
      <div
        {...getRootProps()}
        className="flex justify-center items-center text-center px-4 py-5 mt-1 w-full text-sm rounded-lg bg-slate-100 border-2 border-dashed border-gray-300"
        style={{ cursor: 'pointer' }}
      >
       {
       file ? 
       <>
       <span style={{fontFamily: "Work Sans"}} className="text-gray-400">
      Data has been successfully {' '}
       <span className="text-gray-400" style={{ color: 'blue', cursor: 'pointer' }}>
        Uploaded
       </span>
     </span> 
     </>:
       <>
       <input style={{fontFamily: "Work Sans"}} {...getInputProps()} />
        <span style={{fontFamily: "Work Sans"}} className="text-gray-400">
          Drag and Drop files here or{' '}
          <span className="text-gray-400" style={{ color: 'blue', cursor: 'pointer' }}>
            choose file
          </span>
        </span>
        </>
        }
      </div>
    );
  };
  const handleFilesAdded = (files: File[]) => {
    console.log('Files added:', files);
  };

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     onFilesAdded(acceptedFiles);
  //   },
  //   [onFilesAdded]
  // );

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   multiple: true,
  // });

  return (
    <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120">
      {isSubmitting && <FullScreenLoader />}
      <nav className="flex gap-0 self-start py-5 text-xs whitespace-nowrap">
        <span style={{fontFamily: "Work Sans"}} className="text-gray-400">Knowledge/</span>
        <span  style={{fontFamily: "Work Sans"}} className="text-blue-600">Create source</span>
      </nav>


<section className="flex flex-col justify-center items-center px-5 py-8 bg-white rounded-lg max-md:max-w-full md:px-20" style={{marginTop:20}}>
  <header className="flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl">
    <div className="mt-1">
      <CiCircleInfo className="w-4 h-4 text-gray-600" /> 
    </div>
    <div className="flex flex-col self-start justify-center">
      
      <h2 style={{fontFamily: "Work Sans"}} className="text-2xl leading-normal font-semibold text-slate-800">
      Upload File
      </h2>
      <p style={{fontFamily: "Work Sans"}} className="mt-2 text-sm font-medium text-gray-400">
      Import documents with the information you require.
      </p>
    </div>
  </header>
  <form className="flex flex-col w-full max-w-2xl" onSubmit={handleSubmit(saveSource)}>

  <FileUpload onFilesAdded={handleFilesAdded} />

  </form>
</section>


<section className="flex flex-col justify-center items-center px-5 py-8 bg-white rounded-lg max-md:max-w-full md:px-20">
  <header className="flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl">
    <div className="mt-1">
      <CiCircleInfo className="w-4 h-4 text-gray-600" />
    </div>
    <div className="flex flex-col justify-center">
      <h2 style={{fontFamily: "Work Sans"}} className="text-2xl leading-normal font-semibold text-slate-800">
        Define an Action for your AI Agent
      </h2>
      <p style={{fontFamily: "Work Sans"}} className="mt-2 text-sm font-medium text-gray-400">
        Tell your AI Agent what this action is for and when to use it.
      </p>
    </div>
  </header>
  <form className="flex flex-col w-full max-w-2xl" onSubmit={handleSubmit(saveSource)}>
    <label
      htmlFor="sourceTitle"
      className="mt-8 text-sm font-bold text-gray-400"
    >
      <span style={{fontFamily: "Work Sans"}} className="text-slate-800">Source Title</span>
      <span style={{fontFamily: "Work Sans"}} className="text-gray-400"> (The potential question being asked your AI Agent)</span>
    </label>
    <input
      type="text"
      id="sourceTitle"
      className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border"
      placeholder="Restaurant Location"
      aria-label="Source Title"
      style={{fontFamily: "Work Sans"}}
      {...register('title')}
    />
    {errors.title && <span className="text-red-600">{errors.title.message}</span>}
    <label
      htmlFor="description"
      className="mt-4 text-sm font-bold text-gray-400"
    >
      <span style={{fontFamily: "Work Sans"}} className="text-slate-800">Description</span>
      <span style={{fontFamily: "Work Sans"}} className="text-gray-400"> (The response provided by your AI Agent)</span>
    </label>
    <textarea
      id="description"
      className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border"
      placeholder="Enter response description here"
      aria-label="Description"
      style={{fontFamily: "Work Sans"}}
      {...register('description')}
    ></textarea>
    {errors.description && <span className="text-red-600">{errors.description.message}</span>}
    <label style={{fontFamily: "Work Sans"}} className="mt-4 text-sm font-bold text-slate-800">
      Availability
    </label>
    <div className="flex gap-1 justify-between items-center px-4 py-2 mt-1 w-full text-sm rounded-lg bg-slate-100 flex-wrap">
      <div className="w-full md:w-auto">
        <span style={{fontFamily: "Work Sans"}} className="font-bold text-slate-800">Everyone</span>
        <br />
        <span style={{fontFamily: "Work Sans"}} className="text-gray-400"> (Make this open for all channels used in contacting your AI Agent)</span>
      </div>
     
       <label className="items-center cursor-pointer" style={{ marginLeft: '5px' }}> {/* Reduced margin */}
    <div className="relative">
      <input
        type="checkbox"
        checked={availability}
        onChange={onAvailabilityChange}
        className="sr-only"
        style={{fontFamily: "Work Sans"}}
      />
      <div
        className={`block w-10 h-4 rounded-full ${availability ? 'bg-green-500' : 'bg-gray-400'}`}
      ></div>
      <div
      style={{fontFamily: "Work Sans"}}
        className={`absolute -top-0.5 w-5 h-5 bg-gray-100 rounded-full transition ${
          availability ? 'transform translate-x-full' : ''
        }`}
      ></div>
    </div>
  </label>
    </div>
    <div className="flex gap-4 self-start mt-7 text-sm font-medium flex-wrap">
      <button
        type="submit"
        className="justify-center p-2.5 text-white bg-violet-800 rounded-lg"
        style={{backgroundColor: "#00A45F",fontFamily: "Work Sans"}}
        
      >
        Upload
      </button>
      <a
        type="button"
        className="justify-center p-2.5 text-gray-600 whitespace-nowrap rounded-lg bg-slate-100"
        onClick={() => {
          router.push('/knowledge-base');
        }}
        style={{fontFamily: "Work Sans"}}
      >
        Cancel
      </a>
    </div>
  </form>
</section>

    </div>
  );
};

export default KnowledgeBaseCreate;
