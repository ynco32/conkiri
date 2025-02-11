'use client';

import { useParams } from 'next/navigation';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ViewModeToggle } from './ViewModeToggle';
import { ViewTab } from './ViewTap';
import { SharingList } from './SharingList';
import { SharingMap } from './SharingMap';
import { SharingPost } from '@/types/sharing';
import { VENUE_COORDINATES } from '@/lib/constans/venues';
import { WriteButton } from '@/components/common/WriteButton';
import { formatDateTime } from '@/lib/utils/dateFormat';
import { sharingAPI } from '@/lib/api/sharing';
import { useMswInit } from '@/hooks/useMswInit';

type ViewMode = 'list' | 'map';
type ViewTabItem = 'all' | 'my' | 'scrap';

const ITEMS_PER_PAGE = 10;

export const SharingView = () => {
  // 상태 관리
  const [allPosts, setAllPosts] = useState<SharingPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<SharingPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTab, setCurrentTab] = useState<ViewTabItem>('all');
  const { mswInitialized } = useMswInit();

  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // URL 파라미터
  const params = useParams();
  const concertId =
    params.concertId !== undefined ? Number(params.concertId) : 0;

  // 뷰 모드
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  // 모든 데이터 가져오기
  const fetchData = useCallback(async () => {
    if (!mswInitialized) return;
    setIsLoading(true);

    try {
      let allData: SharingPost[] = [];
      let lastId: number | undefined = undefined;
      let hasMoreData = true;

      while (hasMoreData) {
        let response;

        switch (currentTab) {
          case 'scrap':
            response = await sharingAPI.getScrapSharings(lastId);
            break;
          case 'my':
            // TODO: 내가 쓴 글 API 추가 필요
            response = await sharingAPI.getSharings(concertId, lastId);
            break;
          default:
            response = await sharingAPI.getSharings(concertId, lastId);
        }

        if (!response?.sharings || !Array.isArray(response.sharings)) {
          console.error('Invalid data format:', response);
          break;
        }

        if (response.sharings.length === 0) {
          hasMoreData = false;
          break;
        }

        allData = [...allData, ...response.sharings];

        if (response.lastPage) {
          hasMoreData = false;
        } else {
          lastId = response.sharings[response.sharings.length - 1].sharingId;
        }
      }

      const formattedPosts = allData.map((post) => ({
        ...post,
        startTime: formatDateTime(post.startTime),
      }));

      setAllPosts(formattedPosts);
      setDisplayedPosts(formattedPosts.slice(0, ITEMS_PER_PAGE));
      setHasMore(formattedPosts.length > ITEMS_PER_PAGE);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [concertId, mswInitialized, currentTab]);

  // 초기 데이터 로드
  useEffect(() => {
    if (!mswInitialized) return;
    
    setCurrentPage(0);
    fetchData();
  }, [mswInitialized, currentTab, fetchData]);

  // 더 보기 핸들러 (리스트 뷰)
  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;

    const nextPage = currentPage + 1;
    const start = nextPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const nextPosts = allPosts.slice(start, end);

    if (nextPosts.length > 0) {
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      setCurrentPage(nextPage);
      setHasMore(end < allPosts.length);
    } else {
      setHasMore(false);
    }
  }, [allPosts, currentPage, hasMore, isLoading]);

  // 뷰 모드 변경 핸들러
  const handleViewModeChange = useCallback(
    (newMode: ViewMode) => {
      setViewMode(newMode);
      if (newMode === 'map') {
        setDisplayedPosts(allPosts);
        setCurrentPage(0);
      } else {
        setDisplayedPosts(allPosts.slice(0, ITEMS_PER_PAGE));
        setHasMore(allPosts.length > ITEMS_PER_PAGE);
      }
    },
    [allPosts]
  );

  return (
    <div
      className={`${viewMode === 'map' ? '-mt-[56px] h-screen' : 'flex h-[calc(100vh-56px)] flex-col'}`}
    >
      <div
        className={viewMode === 'map' ? 'absolute top-[56px] z-10 w-full p-4' : 'p-4'}
      >
        <div className="flex items-center justify-between">
          <ViewModeToggle
            viewMode={viewMode}
            onModeChange={handleViewModeChange}
          />
          <ViewTab currentTab={currentTab} onTabChange={setCurrentTab} />
        </div>
      </div>

      <div
        ref={containerRef}
        className={`${viewMode === 'map' ? 'h-full' : 'flex-1 overflow-auto'}`}
      >
        {viewMode === 'map' && (
          <SharingMap
            posts={displayedPosts}
            venueLocation={VENUE_COORDINATES.KSPO_DOME}
            concertId={concertId}
          />
        )}
        {viewMode === 'list' && (
          <SharingList
            posts={displayedPosts}
            concertId={concertId}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>
      <WriteButton path={`/sharing/${concertId}/write`} />
    </div>
  );
};
