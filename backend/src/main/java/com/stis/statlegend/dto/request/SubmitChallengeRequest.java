package com.stis.statlegend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitChallengeRequest {
    private Long challengeId;
    private Long selectedOptionId;
}
