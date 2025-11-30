import { siteConfig } from '@/site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `개인정보 처리방침 - ${siteConfig.name}`,
  description: `${siteConfig.name}의 개인정보 처리방침입니다. 개인정보 수집, 이용, 보호에 대한 정책을 확인하세요.`,
  keywords: `${siteConfig.seo.defaultKeywords}, 개인정보 처리방침, 개인정보 보호`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `개인정보 처리방침 - ${siteConfig.name}`,
    description: `${siteConfig.name}의 개인정보 처리방침입니다.`,
    url: `${siteConfig.url}/privacy`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `개인정보 처리방침 - ${siteConfig.name}`,
    description: `${siteConfig.name}의 개인정보 처리방침입니다.`,
  },
};

export default function PrivacyPage() {
  const updateDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">개인정보 처리방침</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-foreground/80 mb-6 text-sm">
          <strong>최종 업데이트:</strong> {updateDate}
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 개인정보의 처리 목적</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}(이하 &quot;회사&quot;)은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 
            개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li><strong>서비스 제공</strong>: 환율 계산기 및 관련 도구 제공</li>
            <li><strong>서비스 개선</strong>: 사용자 경험 향상을 위한 통계 분석 (익명화된 데이터)</li>
            <li><strong>문의 응답</strong>: 문의사항에 대한 답변 및 지원</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 개인정보의 처리 및 보유기간</h2>
          <p className="text-foreground/80 mb-4">
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li><strong>서비스 이용 기록</strong>: 수집 목적 달성 시 즉시 파기 (단, 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관)</li>
            <li><strong>문의사항</strong>: 문의 응답 완료 후 1년간 보관 후 파기</li>
            <li><strong>로그 데이터</strong>: 서버 로그는 3개월간 보관 후 자동 삭제</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 처리하는 개인정보의 항목</h2>
          <p className="text-foreground/80 mb-4">
            회사는 다음의 개인정보 항목을 처리하고 있습니다:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
            <h3 className="font-semibold mb-2">자동 수집 항목</h3>
            <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
              <li>IP 주소, 쿠키, 방문 일시, 브라우저 정보, 운영체제 정보</li>
              <li>서비스 이용 기록, 접속 로그</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="font-semibold mb-2">선택 수집 항목 (문의 시)</h3>
            <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
              <li>이메일 주소, 이름 (문의 시 제공하는 경우에 한함)</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 쿠키 및 추적 기술</h2>
          <p className="text-foreground/80 mb-4">
            회사는 서비스 제공을 위해 쿠키 및 유사한 기술을 사용할 수 있습니다.
          </p>
          <h3 className="text-xl font-semibold mb-3">4.1 쿠키의 사용 목적</h3>
          <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
            <li><strong>필수 쿠키</strong>: 서비스 기본 기능 제공을 위해 필요한 쿠키</li>
            <li><strong>분석 쿠키</strong>: 서비스 이용 통계 분석 (Google Analytics 등)</li>
            <li><strong>광고 쿠키</strong>: 맞춤형 광고 제공 (Google AdSense)</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3">4.2 Google AdSense</h3>
          <p className="text-foreground/80 mb-4">
            본 웹사이트는 Google AdSense를 사용하여 광고를 제공합니다. Google AdSense는 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
          </p>
          <p className="text-foreground/80 mb-4">
            Google의 개인정보 처리방침은{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              https://policies.google.com/privacy
            </a>
            에서 확인할 수 있습니다.
          </p>
          <h3 className="text-xl font-semibold mb-3">4.3 쿠키 설정 거부</h3>
          <p className="text-foreground/80">
            사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 개인정보의 제3자 제공</h2>
          <p className="text-foreground/80 mb-4">
            회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li>정보주체가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            <li>서비스 제공을 위해 필요한 최소한의 개인정보를 제3자에게 제공하는 경우 (예: Google AdSense, Google Analytics)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
          <p className="text-foreground/80 mb-4">
            정보주체는 다음과 같은 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li><strong>개인정보 열람 요구</strong>: 본인이 제공한 개인정보에 대한 열람을 요구할 수 있습니다.</li>
            <li><strong>개인정보 정정·삭제 요구</strong>: 잘못된 정보에 대한 정정 또는 삭제를 요구할 수 있습니다.</li>
            <li><strong>개인정보 처리정지 요구</strong>: 개인정보 처리의 정지를 요구할 수 있습니다.</li>
          </ul>
          <p className="text-foreground/80 mt-4">
            권리 행사는 이메일({siteConfig.author.email})을 통해 요청하실 수 있으며, 회사는 지체 없이 조치하겠습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 개인정보의 파기</h2>
          <p className="text-foreground/80 mb-4">
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          <h3 className="text-xl font-semibold mb-3">7.1 파기 절차</h3>
          <p className="text-foreground/80 mb-4">
            정보주체가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
          </p>
          <h3 className="text-xl font-semibold mb-3">7.2 파기 방법</h3>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li>전자적 파일 형태: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</li>
            <li>기록물, 인쇄물, 서면 등: 분쇄하거나 소각</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 개인정보 보호책임자</h2>
          <p className="text-foreground/80 mb-4">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <p className="text-foreground/80 mb-2">
              <strong>이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <p className="text-sm text-foreground/60 mt-4">
              정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 개인정보 처리방침 변경</h2>
          <p className="text-foreground/80">
            이 개인정보 처리방침은 법령·정책 또는 보안기술의 변경에 따라 내용의 추가·삭제 및 수정이 있을 시에는 변경사항의 시행 7일 전부터 웹사이트의 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. 문의처</h2>
          <p className="text-foreground/80 mb-4">
            개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <p className="text-foreground/80 mb-2">
              <strong>이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <p className="text-sm text-foreground/60 mt-4">
              일반적으로 영업일 기준 1-2일 이내에 답변드리도록 노력하고 있습니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}



