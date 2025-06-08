package com.example.watchtrack.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FakeUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Devuelve null porque no estamos usando UserDetailsService realmente
        throw new UsernameNotFoundException("No user loaded because we're using JWT only.");
    }
}
