// AuthenticationRequest.java
package com.ayush.ShopFlixBackend.model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class AuthenticationRequest {
    private String email;
    private String password;
}
