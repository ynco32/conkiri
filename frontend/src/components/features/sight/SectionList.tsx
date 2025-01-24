'use client';
import { Section } from '../../ui/Section';

// 섹션 데이터 인터페이스 정의
interface SectionData {
  sectionId: number;
  arenaId: string;
  sectionName: string;
  isScraped: boolean;
}

// 섹션 리스트 props 인터페이스 정의
interface SectionListProps {
  sections: SectionData[];
  onSectionClick?: (sectionId: number) => void;
}

export const SectionList = ({ sections, onSectionClick }: SectionListProps) => {
  // 각 섹션의 위치와 크기를 계산하는 함수
  const getPositionForSection = (index: number, totalSections: number) => {
    // 첫 번째 행 (가장 안쪽)
    if (index < 5) {
      return {
        startAngle: 150 + index * 22,
        endAngle: 170 + index * 22,
        innerRadius: 120,
        outerRadius: 190,
      };
    }
    // 두 번째 행
    if (index < 11) {
      const adjustedIndex = index - 5;
      return {
        startAngle: 145 + adjustedIndex * 22,
        endAngle: 165 + adjustedIndex * 22,
        innerRadius: 190,
        outerRadius: 260,
      };
    }
    // 세 번째 행 (가장 바깥쪽)
    const adjustedIndex = index - 11;
    return {
      startAngle: 140 + adjustedIndex * 22,
      endAngle: 160 + adjustedIndex * 22,
      innerRadius: 260,
      outerRadius: 330,
    };
  };

  return (
    // SVG 컨테이너 설정 (뷰포트 크기 및 반응형)
    <svg viewBox="0 0 1200 800" className="mx-auto w-full max-w-5xl">
      {/* 섹션 맵핑 및 렌더링 */}
      {sections.map((section, index) => {
        const position = getPositionForSection(index, sections.length);
        return (
          <Section
            key={section.sectionId}
            {...section}
            {...position}
            onClick={() => onSectionClick?.(section.sectionId)}
          />
        );
      })}
    </svg>
  );
};
