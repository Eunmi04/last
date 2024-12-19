import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function About() {
  const educationTimeline = [
    { year: '2010 - 2016', school: '신능초등학교', degree: '초등학교 졸업' },
    { year: '2017 - 2019', school: '신능중학교', degree: '중학교 졸업' },
    { year: '2020 - 2022', school: '행신고등학교', degree: '고등학교 졸업' },
    { year: '2023 - ~ing', school: '정보보호학과, 중부대학교', degree: '정보보호학과 재학 중' },
  ]

  return (
    <div className="pt-20 p-8 bg-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">학력</h2>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
          <div className="space-y-8">
            {educationTimeline.map((item, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : ''} items-center`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105">
                    <p className="text-xl font-bold text-gray-800">{item.year}</p>
                    <p className="text-lg text-gray-600">{item.school}</p>
                    <p className="text-md text-gray-500">{item.degree}</p>
                  </div>
                </div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">현재 목표</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 leading-relaxed">
            제 목표는 웹 개발과 보안 기술을 결합하여, 사용자에게 안전하고 효율적인 웹 서비스를 제공하는 것입니다. 현재는 <span className="font-bold text-gray-900">React</span>와 <span className="font-bold text-gray-900">Next.js</span>를 사용한 웹 개발 실력을 쌓고 있으며, 지속적으로 보안 분야에서도 전문성을 넓혀가고 있습니다.
          </p>
        </div>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">연락방법</h2>
        <Link href="/contact" passHref>
          <Button 
            variant="default" 
            size="lg" 
            className="rounded-full text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300 px-8 py-3 text-lg font-semibold shadow-lg"
          >
            연락하기
          </Button>
        </Link>
      </section>
    </div>
  )
}
