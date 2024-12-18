import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20"> {/* Added pt-20 for padding */}
      <h1 className="text-5xl font-extrabold text-black shadow-lg p-6 rounded-md mb-12 transform transition-transform hover:shadow-xl">
        웹서버 개인 포트폴리오입니다.
      </h1>
      
      <Card className="w-[350px] mb-8">
        <CardHeader>
          <CardTitle>프로젝트 소개</CardTitle>
          <CardDescription>최근에 완성한 웹 프로젝트입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>이 프로젝트는 React와 Next.js를 사용하여 구현한 개인 포트폴리오 웹사이트입니다. 
             다양한 기능과 반응형 디자인을 포함하고 있습니다.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">자세히 보기</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
