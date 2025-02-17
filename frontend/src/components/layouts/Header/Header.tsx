'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BackButton } from './BackButton';
import { MenuToggleButton } from './MenuToggleButton';
import { NavigationMenu } from './NavigationMenu';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const rootPaths = ['/main'];
  const shouldShowLogo = rootPaths.some((path) => path === pathname);
  // 경로에 따른 타이틀 매핑
  const getTitleByPath = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathname.startsWith('/sight/reviews/write')) return '리뷰 쓰기';
    if (pathname.startsWith('/mypage/sight')) return '나의 후기';
    if (pathname.startsWith('/mypage/sharing')) return '나의 나눔글';
    if (pathname.startsWith('/mypage/ticketing')) return '티켓팅 기록';
    if (pathSegments[0] === 'sharing' && pathSegments[2] === 'write') {
      return '나눔 등록';
    }
    if (pathSegments[0] === 'sharing' && pathSegments[3] === 'edit') {
      return '나눔글 수정';
    }
    if (pathSegments[0] === 'sight' && pathSegments[3] === 'edit') {
      return '리뷰 수정';
    }

    if (pathname.startsWith('/sight')) return '시야 보기';
    if (pathname.startsWith('/sharing')) return '나눔 지도';
    if (pathname.startsWith('/mypage')) return '나의 프로필';
    if (pathname.startsWith('/ticketing')) return '티켓팅 연습';
    if (pathname.startsWith('/congestion')) return '혼잡도 보기';
    return '';
  };

  const handleBack = () => {
    const pathSegments = pathname.split('/').filter(Boolean);

    // /sight/[arenaid]/[stageType] 경로에서는 바로 /sight로 이동
    if (pathSegments[0] === 'sight' && pathSegments.length === 3) {
      router.push('/sight');
      return;
    }

    // 루트 레벨의 페이지들(/sight, /sharing 등)은 /main으로 이동
    if (
      pathSegments.length === 1 &&
      ['sight', 'sharing', 'mypage', 'ticketing', 'congestion'].includes(
        pathSegments[0]
      )
    ) {
      router.push('/main');
      return;
    }

    // 한 단계 위 경로로 이동
    if (pathSegments.length > 1) {
      const upperPath = '/' + pathSegments.slice(0, -1).join('/');
      router.push(upperPath);
      return;
    }

    // 그 외의 경우는 기본 뒤로가기 동작 수행
    window.history.back();
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <div className="container sticky left-0 top-0 z-header">
      <header className="h-16">
        <div className="relative flex h-full items-center justify-between">
          <div className="flex-none">
            {shouldShowLogo ? (
              <Link href="/main" className="h-8 w-auto">
                <Image
                  src="/svgs/logo.svg"
                  alt="Logo"
                  width={109}
                  height={109}
                  priority
                />
              </Link>
            ) : (
              <BackButton onClick={handleBack} />
            )}
          </div>
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-medium">
            {getTitleByPath()}
          </h1>
          <div className="flex-none">
            <MenuToggleButton onClick={openMenu} />
          </div>
        </div>
      </header>

      <NavigationMenu
        isMenuOpen={isMenuOpen}
        onItemClick={() => {
          setIsMenuOpen(false);
        }}
      />
    </div>
  );
};

export default Header;
