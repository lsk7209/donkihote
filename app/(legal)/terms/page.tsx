import { siteConfig } from '@/site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `이용약관 - ${siteConfig.name}`,
  description: `${siteConfig.name}의 이용약관입니다. 서비스 이용 전 반드시 확인해주세요.`,
  keywords: `${siteConfig.seo.defaultKeywords}, 이용약관, 서비스 약관`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `이용약관 - ${siteConfig.name}`,
    description: `${siteConfig.name}의 이용약관입니다.`,
    url: `${siteConfig.url}/terms`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `이용약관 - ${siteConfig.name}`,
    description: `${siteConfig.name}의 이용약관입니다.`,
  },
};

export default function TermsPage() {
  const updateDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">이용약관</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-foreground/80 mb-6 text-sm">
          <strong>최종 업데이트:</strong> {updateDate}
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 약관의 적용</h2>
          <p className="text-foreground/80">
            본 약관은 {siteConfig.name}(이하 &quot;회사&quot;)이 운영하는 웹사이트의 이용과 관련하여 
            회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 용어의 정의</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>&quot;서비스&quot;란 회사가 제공하는 모든 온라인 서비스를 의미합니다.</li>
            <li>&quot;이용자&quot;란 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.</li>
            <li>&quot;콘텐츠&quot;란 서비스 내에 게시된 모든 정보, 자료, 데이터 등을 의미합니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 서비스의 제공 및 변경</h2>
          <p className="text-foreground/80 mb-2">
            회사는 다음과 같은 서비스를 제공합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li><strong>환율 계산기</strong>: 엔화를 원화로 변환하고 면세 할인을 계산하는 도구</li>
            <li><strong>유틸리티 도구</strong>: 다양한 환율 및 할인 계산 도구 제공</li>
            <li><strong>정보 콘텐츠</strong>: 일본 쇼핑 가이드, FAQ, 환율 정보 등</li>
            <li><strong>기타 서비스</strong>: 회사가 추가로 개발하거나 제휴계약 등을 통해 제공하는 일체의 서비스</li>
          </ul>
          <p className="text-foreground/80 mt-4">
            회사는 서비스의 내용을 변경할 수 있으며, 변경 시 사전에 공지합니다. 
            다만, 긴급한 경우 사후에 공지할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 이용자의 의무</h2>
          <p className="text-foreground/80 mb-4">
            이용자는 다음의 의무를 준수하여야 합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>이용자는 관련 법령, 본 약관, 이용안내 및 서비스와 관련하여 공지한 주의사항을 준수하여야 합니다.</li>
            <li>이용자는 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
            <li>이용자는 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다:
              <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                <li>법령 또는 본 약관에 위반되는 행위</li>
                <li>서비스의 안정적 운영에 지장을 주거나 줄 우려가 있는 행위</li>
                <li>다른 이용자의 서비스 이용을 방해하는 행위</li>
                <li>회사의 지적재산권을 침해하는 행위</li>
                <li>허위 정보를 게시하거나 전송하는 행위</li>
                <li>악성 코드, 바이러스 등을 유포하는 행위</li>
                <li>서비스의 보안을 해치는 행위</li>
              </ul>
            </li>
            <li>이용자가 위 의무를 위반한 경우, 회사는 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 지적재산권</h2>
          <p className="text-foreground/80 mb-4">
            서비스에 게시된 모든 콘텐츠(텍스트, 그래픽, 로고, 아이콘, 이미지, 오디오 클립, 디지털 다운로드, 데이터 편집물 및 소프트웨어 등)의 저작권은 회사에 있으며, 
            이용자는 회사의 사전 서면 동의 없이 이를 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
          </p>
          <p className="text-foreground/80 mb-4">
            다만, 다음의 경우에는 예외로 합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>개인적인 비상업적 목적으로 사용하는 경우</li>
            <li>출처를 명시하고 인용하는 경우</li>
            <li>법령에 따라 허용되는 경우</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 서비스 이용의 제한</h2>
          <p className="text-foreground/80 mb-4">
            회사는 다음의 경우 서비스 이용을 제한하거나 중단할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>서비스 점검, 보수, 교체, 장애 등의 사유가 발생한 경우</li>
            <li>천재지변, 전쟁, 폭동, 화재, 정전 등 불가항력적 사유가 발생한 경우</li>
            <li>기타 회사가 서비스 제공이 곤란하다고 판단하는 경우</li>
          </ul>
          <p className="text-foreground/80 mt-4">
            회사는 서비스 이용 제한 또는 중단 시 사전에 공지하되, 긴급한 경우 사후에 공지할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 면책조항</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
            <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
            <li>회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
            <li>회사는 환율 정보의 정확성을 보장하지 않으며, 계산 결과는 참고용으로만 사용해야 합니다. 실제 거래 시에는 공식 환율을 확인하시기 바랍니다.</li>
            <li>회사는 제3자가 제공하는 정보(예: 환율 API)의 정확성에 대하여 책임을 지지 않습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 분쟁의 해결</h2>
          <p className="text-foreground/80 mb-4">
            회사와 이용자 간에 발생한 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 
            주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 명확하지 아니한 경우의 관할법원은 민사소송법에 따라 정합니다.
          </p>
          <p className="text-foreground/80">
            회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 관할법원에 제기합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 약관의 변경</h2>
          <p className="text-foreground/80 mb-4">
            회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다. 
            약관이 변경되는 경우 회사는 변경 사항을 사전에 공지하며, 변경된 약관은 공지한 시점부터 효력을 발생합니다.
          </p>
          <p className="text-foreground/80">
            이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다. 
            다만, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용하는 경우에는 변경된 약관에 동의한 것으로 간주됩니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. 문의처</h2>
          <p className="text-foreground/80 mb-4">
            본 약관에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
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


