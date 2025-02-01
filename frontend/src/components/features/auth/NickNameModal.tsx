'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitButton } from '@/components/ui/SubmitButton';
import api from '@/lib/api/axios';
import axios, { AxiosError } from 'axios';

interface NickNameState {
  value: string;
  isChecked: boolean;
  isLoading: boolean;
  message: {
    text: string;
    type: 'success' | 'error' | 'none';
  };
}

const NickNameModal = () => {
  const router = useRouter();
  const [state, setState] = useState<NickNameState>({
    value: '',
    isChecked: false,
    isLoading: false,
    message: { text: '', type: 'none' },
  });

  const setMessage = (text: string, type: 'success' | 'error' | 'none') => {
    setState((prev) => ({ ...prev, message: { text, type } }));
  };

  const handleCheckNickName = async () => {
    // 요청 직전에 config와 헤더 확인
    console.log('handleCheckNickName API 요청 설정:', api.defaults);
    console.log(
      'Authorization 헤더:',
      api.defaults.headers.common['Authorization']
    );

    if (!state.value.trim()) {
      setMessage('닉네임을 입력해주세요.', 'error');
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // 1. 요청 전 토큰과 닉네임 값만 확인
      console.log('handleCheckNickName 전송할 닉네임:', state.value);
      console.log('인증 토큰:', api.defaults.headers.common['Authorization']);

      const response = await api.get<boolean>(
        `/api/v1/login/nickname/check?nickname=${state.value}`
      );
      // 응답 데이터 확인
      console.log('서버 응답:', response.data); // true/false만 간단히 확인

      if (response.data) {
        setState((prev) => ({ ...prev, isChecked: true }));
        setMessage('사용 가능한 닉네임입니다.', 'success');
      } else {
        setMessage('이미 사용중인 닉네임입니다.', 'error');
      }
    } catch (error) {
      setMessage('닉네임 중복 확인에 실패했습니다.', 'error');
      // 에러의 기본 정보만 출력
      if (axios.isAxiosError(error)) {
        console.error('handleCheckNickName API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
        });
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSubmit = async () => {
    // 요청 직전에 config와 헤더 확인
    console.log('API 요청 설정:', api.defaults);
    console.log(
      'Authorization 헤더:',
      api.defaults.headers.common['Authorization']
    );

    if (!state.isChecked) {
      setMessage('닉네임 중복 확인을 해주세요.', 'error');
      return;
    }

    if (state.value.length > 20) {
      setMessage('닉네임은 20자 이내로 입력해주세요.', 'error');
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // API 요청 전 설정 확인
      console.log('handleSubmit으로 전송할 닉네임:', state.value);
      console.log(
        'Authorization:',
        api.defaults.headers.common['Authorization']
      );

      const response = await api.post('/api/v1/login/nickname', {
        nickname: state.value,
      });

      // 응답 데이터 확인
      console.log('handleSubmit에 대한 서버 응답:', response.data);

      if (response.status === 200) {
        setMessage('닉네임이 설정되었습니다.', 'success');
        router.push('/main');
      }
    } catch (error) {
      setMessage('닉네임 설정 중 오류가 발생했습니다.', 'error');

      // 에러의 기본 정보만 출력
      if (axios.isAxiosError(error)) {
        console.error('handleSubmit API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
        });
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="w-80 rounded-3xl bg-primary-sub1 p-6">
      <h2 className="mb-2 text-center text-xl font-medium">닉네임 만들기</h2>
      <p className="mb-6 text-center text-sm text-gray-600">
        좌석 후기 및 나눔글에서 사용됩니다
      </p>

      <div className="mb-4">
        <div className="relative flex h-12 w-full items-center rounded-full bg-primary-sub2">
          <input
            type="text"
            value={state.value}
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                value: e.target.value,
                isChecked: false,
              }));
            }}
            placeholder="닉네임을 입력하세요"
            className="h-full w-full rounded-full bg-transparent px-6 text-white placeholder:text-white/70 focus:outline-none"
            maxLength={20}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <SubmitButton
          onClick={handleCheckNickName}
          disabled={state.isLoading}
          // className="bg-secondary hover:bg-secondary/80"
        >
          중복확인
        </SubmitButton>
        <SubmitButton onClick={handleSubmit} disabled={state.isLoading}>
          {state.isLoading ? '처리중...' : '설정'}
        </SubmitButton>
      </div>

      {state.message.text && (
        <p
          className={`mt-2 text-center text-sm ${
            state.message.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {state.message.text}
        </p>
      )}
    </div>
  );
};

export default NickNameModal;
