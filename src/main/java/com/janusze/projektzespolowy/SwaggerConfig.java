package com.janusze.projektzespolowy;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

/**
 * Created by Tomasz Jodko on 2016-03-31.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket userApi() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select().paths(apiPaths()).build();
    }
    private com.google.common.base.Predicate<String> apiPaths() {
        return or(regex("/projektzespolowy/.*"));
    }
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("projektzespolowy").description("Opis").termsOfServiceUrl("Terms of Service")
                .contact("Dane kontaktowe").license("Apache License Version 2.0")
                .licenseUrl("https://github.com/springfox/springfox/blob/master/LICENSE").version("2.0").build();
    }
}
