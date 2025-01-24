package com.conkiri.global.auth.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conkiri.global.auth.dto.RefreshTokenRequestDTO;
import com.conkiri.global.auth.dto.TokenDTO;
import com.conkiri.global.auth.service.AuthService;
import com.conkiri.global.auth.token.CustomOAuth2User;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/refresh")
	public TokenDTO refreshToken(@RequestBody RefreshTokenRequestDTO request) {
		return authService.refreshToken(request.getRefreshToken());
	}

	@PostMapping("/logout")
	public void logout(@AuthenticationPrincipal CustomOAuth2User user) {
		authService.logout(user.getEmail());
	}

}
