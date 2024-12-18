import Link from "next/link";
import Image from "next/image"; // Next.js의 Image 컴포넌트를 import

export default function Project() {
  const projects = [
    {
      name: "HCJ Demo",
      description: "첫 실습페이지로 HTML, CSS, JS를 사용하여 만든 페이지입니다.",
      link: "https://hcjdemo-2024-1-ivory.vercel.app/",
      image: "/project1.png", // 이미지 경로 수정
    },
    {
      name: "Clierk API",
      description: "Clierk API를 이용하여 실습한 페이지입니다.",
      link: "https://clierk-api-nu.vercel.app/",
      image: "/project2.png", // 이미지 경로 수정
    },
    {
      name: "Mongo CRUD",
      description: "Mongo CRUD는 MongoDB를 사용하여 데이터베이스의 기본적인 CRUD(Create, Read, Update, Delete) 작업을 실습한 페이지입니다.",
      link: "https://mongo-crud-nu.vercel.app/",
      image: "/project3.png", // 이미지 경로 수정
    },
    {
      name: "포트폴리오",
      description: "중간 개인포트폴리오 페이지입니다.",
      link: "https://portfolio-ten-weld-29.vercel.app/",
      image: "/project4.png", // 이미지 경로 수정
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 bg-white pt-24">
      <h1 className="text-5xl font-bold mb-8">내 프로젝트 소개</h1>
      <div className="flex flex-col gap-8 w-full max-w-screen-lg">
        {projects.map((project, index) => (
          <div key={index} className="flex bg-gray-100 rounded-lg shadow-md overflow-hidden p-4 h-48">
            <div className="w-1/3 h-full bg-gray-300 rounded-lg relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between w-2/3">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                  페이지이동
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
