interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // AEO 최적화: 질문-답변 스키마 강화
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        // AEO: 답변의 신뢰도 향상
        upvoteCount: 0,
      },
    })),
    // GEO 최적화: 지역 정보
    about: {
      '@type': 'Thing',
      name: '일본 쇼핑 환율 계산',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

