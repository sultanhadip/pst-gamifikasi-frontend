package com.stis.statlegend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeResult {
    private boolean correct;
    private Integer pointsEarned;
    private String message;
}
