import { FaGithub } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi'; 

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-5"> {/* 배경색을 검정색으로 설정 */}
      <div className="max-w-4xl mx-auto sm:px-3 lg:px-6 py-4 flex flex-col items-center justify-center"> {/* 최대 너비를 줄이고 패딩 조정 */}
        <div className="flex gap-6 mb-3">
          <a
            href="https://github.com/Eunmi04"
            className="hover:text-gray-400 inline-flex items-center gap-2 text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl" />
            GitHub
          </a>
          <a
            href="https://www.instagram.com/wjd0419___" // 자신의 Instagram 링크로 변경
            className="hover:text-gray-400 inline-flex items-center gap-2 text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram className="text-xl" />
            Instagram
          </a>
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} 웹보안프로그래밍 정은미 포트폴리오.
        </p>
      </div>
    </footer>
  );
}
