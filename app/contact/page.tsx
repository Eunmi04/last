import React from 'react';
import { FaEnvelope, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const contactMethods = [
    { icon: <FaEnvelope />, label: 'Email', value: 'eunmi041119@gmail.com', link: 'mailto:eunmi041119@gmail.com' },
    { icon: <FaGithub />, label: 'GitHub', value: 'https://github.com/Eunmi04', link: 'https://github.com/Eunmi04' },
    { icon: <FaInstagram />, label: 'Instagram', value: 'https://instagram.com/wjd0419___', link: 'https://instagram.com/wjd0419___' },
  ];

  return (
    <div className="pt-20 p-8 bg-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Me</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">연락 방법</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">저와 연락하고 싶으시면 아래의 방법을 이용해주세요:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2 text-gray-800">{method.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{method.label}</h3>
              <a href={method.link} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 text-sm">
                {method.value}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
