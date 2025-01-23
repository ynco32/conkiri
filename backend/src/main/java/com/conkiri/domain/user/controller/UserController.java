package com.conkiri.domain.user.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conkiri.domain.user.dto.request.NicknameRequest;
import com.conkiri.domain.user.service.UserService;
import com.conkiri.global.auth.CustomOAuth2User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

	private final UserService userService;

	@PostMapping("/nickname")
	public void setNickname(@RequestBody NicknameRequest request,
		@AuthenticationPrincipal CustomOAuth2User user) {
		userService.updateNickname(user.getEmail(), request.getNickname());
	}

	@GetMapping("/nickname/check")
	public boolean checkNicknameDuplicate(@RequestParam String nickname) {
		return userService.checkNickname(nickname);
	}

	@GetMapping("/test")
	public String getAccessToken() {
		String accessToken = SecurityContextHolder.getContext().getAuthentication().getCredentials().toString();
		return accessToken;
	}
}
