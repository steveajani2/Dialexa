import Image from 'next/image';


const ContactUs = () => {
    return (
      <section className="text-gray-800 body-font">
     <div className="hidden md:block container mx-auto flex px-5 py-24 items-center justify-center flex-col">
  <h2 className="text-3xl font-medium title-font mb-4 text-center">Contact Us</h2>
  <div className="flex justify-center mb-4">
    <div className="w-16 h-1 rounded-full inline-flex" style={{background: "#450DBD"}}></div>
  </div>
  <div className="w-full flex flex-col md:flex-row items-start">
    <div className="md:w-1/2 md:pr-8 md:py-8">
      <h3 className="text-lg mb-2 font-medium text-gray-900 text-start">
        For inquiries about our Enterprise Plan or any other questions regarding pricing and features, please contact us directly.
      </h3>
      <p className="leading-relaxed mb-5 text-gray-600 text-start">
        We are committed to finding the best solution for your business's customer support needs.
      </p>
      <div className="flex flex-col space-y-4">
                <div className="flex items-center bg-purple-100 rounded p-2" style={{gap:10}}>
                <Image
               
               src="/assets/email.svg"
               alt="Dialexa.ai logo"
               width={30}
               height={30}
           
             />
                  <span className="text-gray-900">info@Dialexaai.com</span>
                </div>
                <div className="flex items-center bg-purple-100 rounded p-2" style={{gap:10}}>
                <Image
               
               src="/assets/call.svg"
               alt="Dialexa.ai logo"
               width={30}
               height={30}
           
             />
                  <span className="text-gray-900">555-123-4567</span>
                </div>
              </div>
    </div>
    <div className="md:w-1/2 md:pl-8 md:py-8">
      <Image
        src="/assets/contactusimg2.svg"
        alt="Dialexa.ai logo"
        width={1520}
        height={120}
      />
    </div>
  </div>
</div>


        <div className=" block md:hidden container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <h2 className="text-3xl font-medium title-font mb-4">Contact Us</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 rounded-full  inline-flex"style={{background: "#450DBD"}}></div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center" style={{gap:40}}>
          <div className="md:w-1/2 md:pl-8 md:py-8">
            
             
            <Image
               
                src="/assets/contactusimg2.svg"
                alt="Dialexa.ai logo"
                width={320}
                height={120}
            
              />
       
          </div>
            <div className="md:w-1/2 md:pr-8 md:py-8">
              <h3 className="text-lg mb-2 font-medium text-gray-900">
                For inquiries about our Enterprise Plan or any other questions regarding pricing and features, please contact us directly.
              </h3>
              <p className="leading-relaxed mb-5 text-gray-600">
                We are committed to finding the best solution for your business's customer support needs.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center bg-purple-100 rounded p-2" style={{gap:10}}>
                <Image
               
               src="/assets/email.svg"
               alt="Dialexa.ai logo"
               width={30}
               height={30}
           
             />
                  <span className="text-gray-900">info@Dialexaai.com</span>
                </div>
                <div className="flex items-center bg-purple-100 rounded p-2" style={{gap:10}}>
                <Image
               
               src="/assets/call.svg"
               alt="Dialexa.ai logo"
               width={30}
               height={30}
           
             />
                  <span className="text-gray-900">555-123-4567</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  };
  
  export default ContactUs;
  