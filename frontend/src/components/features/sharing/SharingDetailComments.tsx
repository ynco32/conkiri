interface SharingDetailCommentsProps {
    // 추후 댓글 데이터 타입 추가
  }
  
  export const SharingDetailComments = () => {
    return (
      <div className="mt-4 space-y-2 bg-gray-100 p-4">
        <h2 className="font-medium">댓글</h2>
        <p className="text-sm text-gray-500">내용</p>
      </div>
    );
  };