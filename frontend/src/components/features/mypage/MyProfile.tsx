'use client';

import Image from 'next/image';
import { SVGIcons } from '@/assets/svgs';
import { useUserStore } from '@/store/useUserStore';
import { getUserProfileImage } from '@/lib/utils/profileCharacter';

export const MyProfile = () => {
  const { user, isLoading, error } = useUserStore();

  if (user) {
    console.log(user.profileUrl);
  }

  if (isLoading) {
    return (
      <div className="flex h-[35vh] w-full items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-status-warning">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="text-gray-500">No user data available</div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-[150px] w-full mobile:w-[180px] tablet:w-[220px] desktop:w-[250px]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <Image
          src={SVGIcons.ProfileBg}
          alt="background pattern"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* 프로필 이미지 */}
      <div className="relative h-full w-full p-4 mobile:p-3 tablet:p-4">
        <div className="relative h-full w-full">
          <Image
            src={getUserProfileImage(user.level || '')}
            alt={user.nickname}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
