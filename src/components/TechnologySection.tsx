import Image from 'next/image';

const TechnologySection = () => {
  return (
    <section className="text-gray-800 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-4">Our Technology</h1>
        <div className="w-16 h-1 rounded-full  inline-flex" style={{background: "#450DBD"}}></div>

        <div className=" hidden md:block w-full md:w-2/3 mx-auto flex flex-col justify-center items-center mb-12">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="/assets/Techimg.svg"
            width={1772}
            height={140}
            layout="responsive"
          />
    
        </div>
        <div className=" block md:hidden w-full md:w-2/3 mx-auto flex flex-col justify-center items-center mb-12">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="/assets/Mobiletech.svg"
            width={1772}
            height={140}
            layout="responsive"
          />
    
        </div>

        <div className="lg:w-2/3 w-full px-4">
          <div className="mb-8">
            <p className="leading-relaxed text-base font-work-sans text-gray-900" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '28px', color: '#435060', opacity: 0.7 }}>
              At Dialexa Ai, we leverage a sophisticated stack of advanced technologies to deliver unparalleled AI-powered customer support solutions. Our platform harnesses the latest innovations in artificial intelligence, natural language processing, and machine learning to revolutionize the way businesses handle inbound calls.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium title-font mb-2">Artificial Intelligence (AI):</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                Our AI-powered agents are equipped with state-of-the-art algorithms that enable them to understand, interpret, and respond to customer queries with human-like intelligence and accuracy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium title-font mb-2">Natural Language Processing (NLP):</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                Utilizing cutting-edge NLP techniques, our platform can decipher the nuances of human language, enabling seamless communication and interaction between customers and AI agents.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium title-font mb-2">Machine Learning (ML):</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                Through continuous learning and adaptation, our AI agents evolve over time, improving their performance and efficiency in handling a wide range of customer inquiries and scenarios.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium title-font mb-2">Voice Recognition Technology:</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                We employ advanced voice recognition technology to enhance the conversational experience, allowing customers to interact with our AI agents naturally and effortlessly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium title-font mb-2">Cloud Computing Infrastructure:</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                Our platform is built on robust cloud computing infrastructure, ensuring scalability, reliability, and high performance to meet the demands of businesses of all sizes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium title-font mb-2">Data Analytics and Insights:</h2>
              <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                Utilizing sophisticated data analytics tools, we provide valuable insights into call interactions, enabling businesses to make data-driven decisions and optimize their customer support strategies.
              </p>
            </div>

            <p className="leading-relaxed  font-medium mt-6" style={{color: "#450DBD"}}>
              By combining these cutting-edge technologies, Dialexa Ai delivers a seamless, efficient, and personalized customer support experience that sets businesses apart in today's competitive landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnologySection;



// import Image from 'next/image';

// const TechnologySection = () => {
//   return (
//     <section className="text-gray-800 body-font">
//       <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
//         <h1 className="text-3xl font-medium title-font text-gray-900 mb-4">Our Technology</h1>
//         <div className=" bg-green-line w-full" style={{width : 69 , backgroundColor: "#14AC6C", height:3, borderRadius: 20}}/>
//         <div className="w-full md:w-2/3 mx-auto mb-12 flex flex-col justify-center items-center">
//   <Image
//     className="object-cover object-center rounded"
//     alt="hero"
//     src="/assets/Capa.svg"
//     width={12720}
//     height={1400}
//     style={{marginTop: 40}}
//   />
//   <Image
//     className="object-cover object-center rounded"
//     alt="hero"
//     src="/assets/Techimg2.svg"
//     width={720}
//     height={100}
//     style={{marginTop: -320}}
//   />
// </div>


//         {/* <div className="flex justify-center">
          
//           <div className="lg:w-2/3 w-full" >
        //   <div className="w-full md:w-2/3" style={{ width: '954px', height: '114px', top: '729px', left: '247px' }}>
        //   <p className="leading-relaxed text-base font-work-sans text-gray-900" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '28px', color: '#435060', opacity: 0.7 }}>
        //     At Dialexa Ai, we leverage a sophisticated stack of advanced technologies to deliver unparalleled AI-powered customer support solutions. Our platform harnesses the latest innovations in artificial intelligence, natural language processing, and machine learning to revolutionize the way businesses handle inbound calls.
        //   </p>
        // </div>
//             <h2 className="text-2xl font-medium title-font mb-2">Artificial Intelligence (AI):</h2>
//             <p className="leading-relaxed mb-4" style={{opacity: 0.7}}>Our AI-powered agents are equipped with state-of-the-art algorithms that enable them to understand, interpret, and respond to customer queries with human-like intelligence and accuracy.</p>
//             <h2 className="text-2xl font-medium title-font mb-2">Natural Language Processing (NLP):</h2>
//             <p className="leading-relaxed mb-4" style={{opacity: 0.7}}>Utilizing cutting-edge NLP techniques, our platform can decipher the nuances of human language, enabling seamless communication and interaction between customers and AI agents.</p>
//             <h2 className="text-2xl font-medium title-font mb-2">Machine Learning (ML):</h2>
//             <p className="leading-relaxed mb-4" style={{opacity: 0.7}}>Through continuous learning and adaptation, our AI agents evolve over time, improving their performance and efficiency in handling a wide range of customer inquiries and scenarios.</p>
//             <h2 className="text-2xl font-medium title-font mb-2">Voice Recognition Technology:</h2>
//             <p className="leading-relaxed mb-4" style={{opacity: 0.7}}>We employ advanced voice recognition technology to enhance the conversational experience, allowing customers to interact with our AI agents naturally and effortlessly.</p>
//             <h2 className="text-2xl font-medium title-font mb-2">Cloud Computing Infrastructure:</h2>
//             <p className="leading-relaxed mb-4" style={{opacity: 0.7}}>Our platform is built on robust cloud computing infrastructure, ensuring scalability, reliability, and high performance to meet the demands of businesses of all sizes.</p>
//             <h2 className="text-2xl font-medium title-font mb-2">Data Analytics and Insights:</h2>
//             <p className="leading-relaxed mb-4"style={{opacity: 0.7}}>Utilizing sophisticated data analytics tools, we provide valuable insights into call interactions, enabling businesses to make data-driven decisions and optimize their customer support strategies.</p>
//             <p className="leading-relaxed text-green-600 font-medium">By combining these cutting-edge technologies, Dialexa Ai delivers a seamless, efficient, and personalized customer support experience that sets businesses apart in today's competitive landscape.</p>
//           </div>
//         </div> */}

//         <div className="flex justify-center">
          
//   <div className="lg:w-2/3 w-full px-4">
//   <div className="w-full md:w-2/3" style={{ width: '954px', height: '114px', top: '729px', left: '247px' }}>
//           <p className="leading-relaxed text-base font-work-sans text-gray-900" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '28px', color: '#435060', opacity: 0.7 }}>
//             At Dialexa Ai, we leverage a sophisticated stack of advanced technologies to deliver unparalleled AI-powered customer support solutions. Our platform harnesses the latest innovations in artificial intelligence, natural language processing, and machine learning to revolutionize the way businesses handle inbound calls.
//           </p>
//         </div>

//     <div className="space-y-6" >
//       <div>
//         <h2 className="text-2xl font-medium title-font mb-2">Artificial Intelligence (AI):</h2>
//         <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
//           Our AI-powered agents are equipped with state-of-the-art algorithms that enable them to understand, interpret, and respond to customer queries with human-like intelligence and accuracy.
//         </p>
//       </div>

//       <div>
//         <h2 className="text-2xl font-medium title-font mb-2">Natural Language Processing (NLP):</h2>
//         <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
//           Utilizing cutting-edge NLP techniques, our platform can decipher the nuances of human language, enabling seamless communication and interaction between customers and AI agents.
//         </p>
//       </div>

//       <div>
//         <h2 className="text-2xl font-medium title-font mb-2">Machine Learning (ML):</h2>
//         <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
//           Through continuous learning and adaptation, our AI agents evolve over time, improving their performance and efficiency in handling a wide range of customer inquiries and scenarios.
//         </p>
//       </div>

//       <div>
//         <h2 className="text-2xl font-medium title-font mb-2">Voice Recognition Technology:</h2>
//         <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
//           We employ advanced voice recognition technology to enhance the conversational experience, allowing customers to interact with our AI agents naturally and effortlessly.
//         </p>
//       </div>

//       <div>
//         <h2 className="text-2xl font-medium title-font mb-2">Cloud Computing Infrastructure:</h2>
//         <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
//           Our platform is built on robust cloud computing infrastructure, ensuring scalability, reliability, and high performance to meet the demands of businesses of all sizes.
//         </p>
//       </div>

//       <div>
//         <h2 className="text-2xl font-medium title-font mb-2">Data Analytics and Insights:</h2>
//         <p className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
//           Utilizing sophisticated data analytics tools, we provide valuable insights into call interactions, enabling businesses to make data-driven decisions and optimize their customer support strategies.
//         </p>
//       </div>

//       <p className="leading-relaxed text-green-600 font-medium mt-6">
//         By combining these cutting-edge technologies, Dialexa Ai delivers a seamless, efficient, and personalized customer support experience that sets businesses apart in today's competitive landscape.
//       </p>
//     </div>
//   </div>
// </div>


//       </div>
//     </section>
//   );
// }

// export default TechnologySection;



