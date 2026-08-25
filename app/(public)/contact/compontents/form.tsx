'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ContactFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

function ContactInfoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
   
    console.log('Form Data:', data);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#edf7f5] rounded-3xl p-8 sm:p-12 shadow-xs">
  
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Contact Info
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
          Nibh dis faucibus proin lacus tristique
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     
          <div>
            <label 
              htmlFor="firstName" 
              className="block text-xs font-bold text-gray-900 mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Your name"
              {...register('firstName', { required: 'First name is required' })}
              className="w-full px-4 py-3 bg-white border border-transparent rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition"
            />
            {errors.firstName && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">
                {errors.firstName.message}
              </p>
            )}
          </div>

     
          <div>
            <label 
              htmlFor="lastName" 
              className="block text-xs font-bold text-gray-900 mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Your last name"
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full px-4 py-3 bg-white border border-transparent rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition"
            />
            {errors.lastName && (
              <p className="mt-1 text-[11px] text-red-500 font-medium">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-xs font-bold text-gray-900 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your E-mail address"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-4 py-3 bg-white border border-transparent rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition"
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-red-500 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-xs font-bold text-gray-900 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Your message..."
            {...register('message', { required: 'Message is required' })}
            className="w-full px-4 py-3 bg-white border border-transparent rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition resize-none"
          />
          {errors.message && (
            <p className="mt-1 text-[11px] text-red-500 font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#2a9d8f] hover:bg-[#238377] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactInfoForm