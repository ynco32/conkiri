// src/mocks/data/sharing.data.ts

import { SharingPost, Comment, SharingStatus } from '@/types/sharing';

// 실제 데이터에는 concertId가 있어야 합니다
interface ExtendedSharingPost extends SharingPost {
  concertId: number;
}

export const mockSharings: ExtendedSharingPost[] = [
  {
    sharingId: 1,
    concertId: 1,
    title: '베몬 포카 나눔합니다',
    content:
      '안녕하세요! 베몬 포토카드 나눔합니다. 총 5장이며 상태 좋습니다. 관심 있으신 분들 신청해주세요!',
    nickname: '닉네임',
    status: 'ONGOING' as SharingStatus,
    startTime: '2025-02-12T14:00',
    photoUrl: '/images/card.png',
    latitude: 37.518073,
    longitude: 127.127244,
  },
  {
    sharingId: 2,
    concertId: 1,
    title: '포카 나눔합니다22',
    content:
      '새로 받은 포토카드 중 중복된 카드 2장을 나눔합니다. 원하시는 분 계시면 연락주세요!',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T15:30',
    photoUrl: '/images/card.png',
    latitude: 37.518851,
    longitude: 127.125405,
  },
  {
    sharingId: 3,
    concertId: 1,
    title: '떴다 팔찌 나눔',
    content:
      '한 번 써본 팔찌 나눔합니다. 아직 상태 좋고 깨끗합니다. 가져가실 분 연락주세요!',
    nickname: '닉네임',
    status: 'CLOSED' as SharingStatus,
    startTime: '2025-02-12T13:00',
    photoUrl: '/images/card.png',
    latitude: 37.520402,
    longitude: 127.128242,
  },
  {
    sharingId: 4,
    concertId: 1,
    title: '포토카드 세트 나눔합니다',
    content:
      '최근에 구매한 포토카드 세트 중 일부를 나눔합니다. 관심 있는 콜렉터분들 환영합니다!',
    nickname: '닉네임',
    status: 'ONGOING' as SharingStatus,
    startTime: '2025-02-12T16:00',
    photoUrl: '/images/card.png',
    latitude: 37.518843,
    longitude: 127.128111,
  },
  {
    sharingId: 5,
    concertId: 1,
    title: '부채 나눔합니다',
    content:
      '여름을 대비해 새 부채를 나눔합니다. 디자인 예쁘고 상태 좋습니다. 필요하신 분 연락주세요!',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.51795,
    longitude: 127.126744,
  },
  {
    sharingId: 6,
    concertId: 1,
    title: '부채 나눔합니다22',
    content: '추가로 부채 한 개 더 나눔합니다. 관심 있으신 분들 신청해주세요!',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.517201,
    longitude: 127.129205,
  },
  {
    sharingId: 7,
    concertId: 1,
    title: '나눔 게시글',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.519038,
    longitude: 127.127355,
  },
  {
    sharingId: 8,
    concertId: 1,
    title: '나눔 게시글',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.519187,
    longitude: 127.126986,
  },
  {
    sharingId: 9,
    concertId: 1,
    title: '나눔 게시글',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.519571,
    longitude: 127.129064,
  },
  {
    sharingId: 10,
    concertId: 1,
    title: '나눔 게시글',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.520074,
    longitude: 127.127165,
  },
  {
    sharingId: 11,
    concertId: 1,
    title: '나눔 게시글22',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.518236,
    longitude: 127.126401,
  },
  {
    sharingId: 12,
    concertId: 2,
    title: '나눔 게시글',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.518236,
    longitude: 127.126401,
  },
  {
    sharingId: 13,
    concertId: 2,
    title: '나눔 게시글',
    content: '나눔 내용',
    nickname: '닉네임',
    status: 'UPCOMING' as SharingStatus,
    startTime: '2025-02-12T17:30',
    photoUrl: '/images/card.png',
    latitude: 37.520074,
    longitude: 127.127165,
  },
];

export const mockComments: Comment[] = [
  {
    commentId: 1,
    sharingId: 1,
    writer: '닉네임',
    content: '저 참여하고 싶어요!',
    modifyTime: '2025-02-12T14:00:00',
  },
  {
    commentId: 2,
    sharingId: 1,
    writer: '닉네임2',
    content: '혹시 아직 가능한가요?',
    modifyTime: '2025-02-12T14:30:00',
  },
];

// 특정 공연의 나눔 게시글만 필터링하는 헬퍼 함수
export const getSharingsByConcertId = (concertId: number): SharingPost[] => {
  return mockSharings
    .filter((sharing) => sharing.concertId === concertId)
    .map((sharing) => {
      const {
        sharingId,
        title,
        content,
        nickname,
        status,
        startTime,
        photoUrl,
        latitude,
        longitude,
      } = sharing;
      return {
        sharingId,
        title,
        content,
        nickname,
        status,
        startTime,
        photoUrl,
        latitude,
        longitude,
      };
    });
};

// 특정 나눔 게시글의 상세 정보를 가져오는 헬퍼 함수
export const getSharingById = (sharingId: number): SharingPost | undefined => {
  const sharing = mockSharings.find(
    (sharing) => sharing.sharingId === sharingId
  );
  if (sharing) {
    const {
      sharingId: id,
      title,
      content,
      nickname,
      status,
      startTime,
      photoUrl,
      latitude,
      longitude,
    } = sharing;
    return {
      sharingId: id,
      title,
      content,
      nickname,
      status,
      startTime,
      photoUrl,
      latitude,
      longitude,
    };
  }
  return undefined;
};

// 특정 나눔 게시글의 댓글을 가져오는 헬퍼 함수
export const getCommentsBySharingId = (sharingId: number): Comment[] => {
  return mockComments.filter((comment) => comment.sharingId === sharingId);
};
