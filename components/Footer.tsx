import { FaGithub } from 'react-icons/fa'
import { FiGlobe, FiInstagram } from 'react-icons/fi' // Google과 Instagram 아이콘 추가

export default function Footer() {
  return (
    <footer className="bg-purple-300 text-white mt-5">
      <div className="max-w-6xl mx-auto sm:px-3 lg:px-8 py-6 flex flex-col items-center justify-center">
        <div className="flex gap-6 mb-3">
          <a
            href="https://github.com/Eunmi04"
            className="hover:text-gray-100 inline-flex items-center gap-2 text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl" />
            GitHub
          </a>
          <a
            href="https://www.instagram.com/wjd0419___" // 자신의 Instagram 링크로 변경
            className="hover:text-gray-100 inline-flex items-center gap-2 text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram className="text-xl" />
            Instagram
          </a>
        </div>
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} 웹보안프로그래밍 정은미 포트폴리오.
        </p>
      </div>
    </footer>
  )
}
