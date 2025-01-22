package com.conkiri.domain.sharing.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SharingRequestDTO {

	@NotNull
	private Long concertId;

	@NotNull
	private Long userId;

	@NotBlank
	private String title;

	private String content;
	private Double latitude;
	private Double longitude;
	private LocalDateTime startTime;
}
