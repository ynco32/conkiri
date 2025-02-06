import React from 'react';
import Image from 'next/image';
import { ContentCard } from '@/components/ui/ContentCard';
import { SharingPost, SharingStatus } from '@/types/sharing';
import { ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface SharingCardProps extends SharingPost {
  wrapperClassName?: string; // 지도에서만 스타일 적용하기 위함
  concertId: number;
}

/**
 * 나눔 게시글 카드 컴포넌트
 * @description 나눔 게시글의 기본 정보를 카드 형태로 보여주는 컴포넌트
 */
export const SharingCard = ({
  sharingId,
  title,
  nickname,
  status,
  startTime,
  photoUrl,
  concertId,
  wrapperClassName = 'border-0', // 스타일 기본값
}: SharingCardProps) => {
  // 제목 길이에 따른 말줄임표 처리
  const maxTitleLength = 30;
  const truncatedTitle =
    title.length > maxTitleLength
      ? `${title.slice(0, maxTitleLength - 3)}...`
      : title;

      const getStatusText = (status: SharingStatus) => {
        switch (status) {
          case 'ONGOING':
            return '진행중';
          case 'UPCOMING':
            return '준비중';
          case 'CLOSED':
            return '마감';
          default:
            return '';
        }
      };
    
      const getStatusColor = (status: SharingStatus) => {
        switch (status) {
          case 'ONGOING':
            return 'bg-status-success';
          case 'UPCOMING':
            return 'bg-status-caution';
          case 'CLOSED':
            return 'bg-gray-400';
          default:
            return 'bg-gray-400';
        }
      };

  return (
    <Link href={`/sharing/${concertId}/${sharingId}`} passHref>
      <ContentCard className={wrapperClassName}>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="max-w-[calc(100%-80px)] truncate font-medium">
              {truncatedTitle}
            </h3>
            <span
              className={`group rounded-md px-2 py-1 text-xs text-white ${getStatusColor(status)}`}
            >
              {getStatusText(status)}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-600">{nickname}</div>
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-900">
            <ClockIcon className="h-4 w-4" />
            {startTime}
          </div>
        </div>

        <div className="relative h-20 w-20">
          <Image
            src={photoUrl ?? '/images/card.png'}
            alt={title}
            fill
            sizes="(max-width: 80px) 100vw, 80px"
            className="rounded-md object-cover"
          />
        </div>
      </ContentCard>
    </Link>
  );
};
