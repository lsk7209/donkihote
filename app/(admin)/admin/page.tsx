import { DuplicateCheck } from '@/components/admin/DuplicateCheck';
import { AdminStatsOverview } from '@/components/admin/AdminStatsOverview';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-2 text-gray-600">
          전체 콘텐츠 현황, 조회수, SEO/가독성 상태를 한눈에 확인합니다.
        </p>
      </div>

      <AdminStatsOverview />

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">중복 콘텐츠 검사</h2>
        <p className="text-sm text-gray-600 mb-4">
          키워드, 제목, Canonical URL 기준으로 중복 가능성이 있는 콘텐츠를
          검사합니다.
        </p>
        <DuplicateCheck />
      </div>
    </div>
  );
}
