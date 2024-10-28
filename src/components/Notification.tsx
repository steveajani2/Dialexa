import React from 'react';

const Notification = () => {
  return (
    <main className="flex-1 p-6">
<div 
  className="bg-white shadow-md p-6 rounded-lg opacity-50 pointer-events-none" 
  style={{ filter: 'grayscale(100%)' }} // Optional grayscale effect
>
  <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Work Sans' }}>
    Notification (Coming soon)
  </h2>
  <p className="text-gray-500 mb-4" style={{ fontFamily: 'Work Sans' }}>
    Set your notification preferences. We may still send you important notifications about your account outside of your notification settings.
  </p>

  <div className="space-y-6 mb-12">
    <div className="border-b pb-4">
      <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Work Sans' }}>Incoming calls</h3>
      <p className="text-gray-500 mb-2" style={{ fontFamily: 'Work Sans' }}>
        These are notifications for when you receive a call.
      </p>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" defaultChecked />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>Push</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>Email</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>SMS</span>
        </label>
      </div>
    </div>

    <div className="border-b pb-4">
      <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Work Sans' }}>Completed calls</h3>
      <p className="text-gray-500 mb-2" style={{ fontFamily: 'Work Sans' }}>
        These are notifications when your AI completes a call.
      </p>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" defaultChecked />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>Push</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>Email</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>SMS</span>
        </label>
      </div>
    </div>

    <div className="border-b pb-4">
      <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Work Sans' }}>Abandoned calls</h3>
      <p className="text-gray-500 mb-2" style={{ fontFamily: 'Work Sans' }}>
        These are notifications when a call is abandoned.
      </p>
      <div className="flex space-x-4">
        <label className="flex items-center" style={{ fontFamily: 'Work Sans' }}>
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" defaultChecked />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>Push</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>Email</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
          <span className="ml-2 text-gray-600" style={{ fontFamily: 'Work Sans' }}>SMS</span>
        </label>
      </div>
    </div>
  </div>
</div>

<div 
  className="flex-row mt-8 bg-white shadow-md p-6 rounded-lg opacity-50 pointer-events-none" 
  style={{ filter: 'grayscale(100%)' }} // Optional grayscale effect
>
  <h3 className="text-lg font-medium text-black-600" style={{ fontFamily: 'Work Sans' }}>
    Delete account (Coming soon)
  </h3>
  <p className="text-gray-500 mb-4" style={{ fontFamily: 'Work Sans' }}>
    We do our best to give you a great experience - we’ll be sad to see you leave us.
  </p>
  <button className="text-red-600 font-semibold hover:text-red-700" style={{ fontFamily: 'Work Sans' }}>
    Delete Account
  </button>
</div>

  </main>
  );
};

export default Notification;
