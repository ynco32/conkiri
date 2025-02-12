import { rest } from 'msw';
import { getSharingById, getCommentsByPage } from '../data/sharing.data';
import { Comment } from '@/types/sharing'; // Comment 타입 import 추가

type PathParams = {
  concertId: string;
  sharingId: string;
};

export const sharingCommentHandlers = [
  // 댓글 목록 조회
  rest.get('/api/v1/sharing/:sharingId/comment', (req, res, ctx) => {
    const params = req.params as PathParams;
    const sharingIdNum = Number(params.sharingId);
    const lastParam = req.url.searchParams.get('last');
    const lastCommentId = lastParam !== null ? Number(lastParam) : undefined;

    // 게시글이 존재하는지 먼저 확인
    const sharing = getSharingById(sharingIdNum);
    if (!sharing) {
      return res(
        ctx.delay(300),
        ctx.status(400),
        ctx.json({ message: '게시글을 찾을 수 없습니다.' })
      );
    }

    // 댓글 페이지네이션 처리
    const { comments, lastPage } = getCommentsByPage(lastCommentId);

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        comments,
        lastPage,
      })
    );
  }),

  // 댓글 등록
  rest.post('/api/v1/sharing/comment', async (req, res, ctx) => {
    const { content, sharingId } = await req.json();

    // 요청 검증
    if (!content || !content.trim() || !sharingId) {
      return res(
        ctx.status(400),
        ctx.json({ message: '필수 입력값이 누락되었습니다.' })
      );
    }

    // 정상 응답
    const newComment: Comment = {
      commentId: Date.now(),
      writer: '테스트 유저',
      writerId: 123,
      content,
      modifyTime: new Date().toISOString(),
    };

    return res(ctx.status(201), ctx.json(newComment));
  }),

  // 댓글 수정
  rest.put('/api/v1/sharing/comment/:commentId', async (req, res, ctx) => {
    const { commentId } = req.params;
    const { content } = await req.json();

    if (!content || !content.trim()) {
      return res(
        ctx.status(400),
        ctx.json({ message: '댓글 내용을 입력해주세요.' })
      );
    }

    // 수정된 댓글 응답
    const updatedComment: Comment = {
      commentId: Number(commentId),
      writer: '테스트 유저',
      writerId: 123,
      content,
      modifyTime: new Date().toISOString(),
    };

    return res(ctx.status(200), ctx.json(updatedComment));
  }),

  // 댓글 삭제
  rest.delete('/api/v1/sharing/comment/:commentId', async (req, res, ctx) => {
    const { commentId } = req.params;

    // commentId가 유효한지 검사
    if (!commentId) {
      return res(
        ctx.status(400),
        ctx.json({ message: '댓글을 찾을 수 없습니다.' })
      );
    }
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({ message: '댓글이 삭제되었습니다.' })
    );
  }),
];
