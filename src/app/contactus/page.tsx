
import Header from "@/components/Headercopy";
import ContactUs from "@/components/Contactus";

import Image from 'next/image';
import Link from 'next/link';


export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center bg-white ">
 <Header title={"Contactus"} />
 <ContactUs />

      
      <footer className="w-full text-white py-4" style={{marginTop:10}}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
        <Image
                  
                  src="/assets/Logotext.svg"
                  alt="Dialexa.ai logo"
                  width={120}
                  height={120}
              
                />
         
        </div>
        <div className="flex space-x-6 text-black">
          <Link href="/aboutus" legacyBehavior>
            <a className="hover:text-gray-400">About Us</a>
          </Link>
          <Link href="/contactus" legacyBehavior>
            <a className="hover:text-gray-400">Pricing</a>
          </Link>
          <Link href="/contactus" legacyBehavior>
            <a className="hover:text-gray-400">Contact Us</a>
          </Link>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-700 mt-4 pt-4 text-gray-400">
        <span>Copyright 2024</span>
        {/* <div className="flex space-x-4">
          <Link href="/terms" legacyBehavior>
            <a className="hover:text-gray-400">Terms and Conditions</a>
          </Link>
          <Link href="/privacy" legacyBehavior>
            <a className="hover:text-gray-400">Privacy Policy</a>
          </Link>
        </div> */}
      </div>
    </footer>
    </div>
  );
}
