import Link from "next/link";
import Image from "next/image"; // Importing Image from next/image
import React from "react";

export default function Home() {
  const teamMembers = [
    {
      name: "김건희",
      github: "https://github.com/000712",
      image: "https://goyanghub.vercel.app/_next/image?url=%2Fimages%2Fteam%2Fgeonhee.jpg&w=256&q=75",
    },
    {
      name: "김혜정",
      github: "https://github.com/hyejeong22",
      image: "https://goyanghub.vercel.app/_next/image?url=%2Fimages%2Fteam%2Fhyejeong.png&w=256&q=75",
    },
    {
      name: "백서진",
      github: "https://github.com/tjwls11",
      image: "https://goyanghub.vercel.app/_next/image?url=%2Fimages%2Fteam%2Fseojin.png&w=256&q=75",
    },
    {
      name: "정은미",
      github: "https://github.com/Eunmi04",
      image: "https://goyanghub.vercel.app/_next/image?url=%2Fimages%2Fteam%2Feunmi.jpg&w=256&q=75",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Link href="https://goyanghub.vercel.app/" target="_blank" rel="noopener noreferrer" className="mb-8">
          <Image
            src="/path/to/team.png" // Update this path as needed
            alt="팀 프로젝트"
            className="w-full h-auto rounded-lg shadow-lg mb-4 cursor-pointer"
            width={500} // Set appropriate width
            height={300} // Set appropriate height
          />
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-9">팀 중간 과제 페이지입니다.</h1>

      <h2 className="text-5xl font-semibold text-gray-800 mb-8 text-center">팀원 소개</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-screen-lg">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-gray-500 flex items-center justify-center mb-2">
              <Image 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full rounded-full" 
                width={96} // Set appropriate width for the profile image
                height={96} // Set appropriate height for the profile image
              />
            </div>
            <p className="text-lg font-bold">{member.name}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer">
              <button className="mt-2 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600">
                GitHub
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
