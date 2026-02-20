package com.stis.statlegend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnlockUnitRequest {
    @NotNull
    private Long unitId;
}
