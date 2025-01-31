import type { Meta, StoryObj } from '@storybook/react';
import { DraggableReviewSheet } from './DraggableReviewSheet';

const meta = {
  title: 'Features/Review/DraggableReviewSheet',
  component: DraggableReviewSheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DraggableReviewSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const reviewDataList = [
  {
    concertTitle: '2025 BABYMONSTER 1st WORLD TOUR (HELLO MONSTERS) IN SEOUL',
    nickName: '닉네임닉네임',
    profilePicture: 'https://picsum.photos/200',
    seatInfo: '203구역 4열',
    images: ['https://picsum.photos/800/600'],
    content:
      '소학교 때 책상을 같이 했던 아이들의 이름과 때, 경, 옥 이런 이국소녀들의 이름과 떠써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노루, 노루, 프랑시스 잠 ...',
    viewQuality: '하나님석 잘 보여요',
    soundQuality: '음향 평범해요',
    seatQuality: '좌석 평범해요',
  },
  {
    concertTitle: '2025 BABYMONSTER 1st WORLD TOUR (HELLO MONSTERS) IN SEOUL',
    nickName: '새벽리뷰어',
    profilePicture: 'https://picsum.photos/201',
    seatInfo: '102구역 15열',
    images: [
      'https://picsum.photos/800/600',
      'https://picsum.photos/800/601',
      'https://picsum.photos/800/602',
    ],
    content:
      '공연장 분위기가 정말 좋았어요. 특히 앵콜 무대에서 보여준 퍼포먼스는 잊을 수 없을 것 같아요!',
    viewQuality: '시야 좋아요',
    soundQuality: '음향 매우 좋음',
    seatQuality: '좌석 편해요',
  },
  {
    concertTitle: '2025 BABYMONSTER 1st WORLD TOUR (HELLO MONSTERS) IN SEOUL',
    nickName: '콘서트매니아',
    profilePicture: 'https://picsum.photos/202',
    seatInfo: '1층 C구역 23열',
    images: [],
    content:
      '음향이 살짝 아쉬웠지만 무대는 정말 최고였습니다. 다음에도 꼭 보러 올게요!',
    viewQuality: '무대가 잘 보여요',
    soundQuality: '음향이 조금 아쉬워요',
    seatQuality: '좌석은 괜찮아요',
  },
];

export const Default: Story = {
  args: {
    isOpen: true,
    reviewDataList: reviewDataList,
    onClose: () => console.log('Sheet closed'),
  },
};

export const HalfOpen: Story = {
  args: {
    isOpen: true,
    reviewDataList: reviewDataList.slice(0, 2),
    onClose: () => console.log('Sheet closed'),
  },
};

export const SingleReview: Story = {
  args: {
    isOpen: true,
    reviewDataList: [reviewDataList[0]],
    onClose: () => console.log('Sheet closed'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    reviewDataList: reviewDataList,
    onClose: () => console.log('Sheet closed'),
  },
};
