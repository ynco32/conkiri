import { useEffect, useState } from 'react';
import Captcha from './Captcha';

interface SecurityMessagePopupProps {
  isOpen: boolean;
  onPostpone: () => void; // 나중에 입력으로 미루는 경우
  onSuccess: () => void; // 보안 문자 잘 쳐서 들어가는 경우우
}

export default function SecurityMessagePopup({
  isOpen,
  onPostpone,
  onSuccess,
}: SecurityMessagePopupProps) {
  const [captchaText, setCaptchatext] = useState('');
  const [inputText, setInputText] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  //텍스트 생성
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchatext(result);
    setInputText('');
    setIsValid(false);
  };

  // 음성 읽기 기능
  const speakCaptcha = () => {
    const utterance = new SpeechSynthesisUtterance(captchaText);
    window.speechSynthesis.speak(utterance);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputText(inputValue);
    if (inputValue === captchaText) {
      setIsValid(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[425px] rounded-lg bg-white p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary-main">인증예매</h2>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-center text-gray-600">
            부정예매 방지를 위해 보안문자를 정확히 입력해주세요.
          </p>
          <Captcha
            captchaText={captchaText}
            generateCaptcha={generateCaptcha}
            handleInputChange={handleInputChange}
            inputText={inputText}
            speakCaptcha={speakCaptcha}
          />
          {error && (
            <p className="text-status-warning">문자를 정확히 입력하세요</p>
          )}
          <div className="flex justify-center">
            <button
              className="rounded-full bg-primary-main px-12 py-2 text-white"
              onClick={isValid ? onSuccess : () => setError(true)}
            >
              입력 완료
            </button>
          </div>
          <button
            className="inline-block w-full text-center text-sm text-gray-500 underline hover:underline [&>span]:active:bg-gray-200"
            onClick={onPostpone}
          >
            <span>좌석 먼저 확인하고 나중에 입력하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
