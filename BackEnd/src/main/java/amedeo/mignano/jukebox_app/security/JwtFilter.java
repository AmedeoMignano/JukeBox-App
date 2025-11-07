package amedeo.mignano.jukebox_app.security;

import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.UnauthorizedException;
import amedeo.mignano.jukebox_app.services.UsersService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private static final List<String> EXCLUDED_PATHS = Arrays.asList(
            "/auth/**",
            "/guest-session/**",
            "/requests/**",
            "/ws/**",
            "/events/active"
    );
    @Autowired
    private JwtTools jwtTools;
    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;
    @Autowired
    private UsersService usersService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String authHeader = request.getHeader("Authorization");
            if(authHeader == null || !authHeader.startsWith("Bearer ")) throw new UnauthorizedException("Inserire il token nell'authorization header nel formato giusto!");

            String token = authHeader.replace("Bearer ", "");
            jwtTools.verifyToken(token);
            Long userId = jwtTools.extractIdFromToken(token);
            var user = usersService.findById(userId);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request,response);
        }catch (UnauthorizedException ex){
            this.resolver.resolveException(request, response, null, ex);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        AntPathMatcher pathMatcher = new AntPathMatcher();

        return EXCLUDED_PATHS.stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, path));
    }


}
