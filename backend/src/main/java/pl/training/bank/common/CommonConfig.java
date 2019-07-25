package pl.training.bank.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import pl.training.bank.common.profiler.Profiler;
import pl.training.bank.common.validator.ModelValidator;
import pl.training.bank.common.validator.ValidatorService;

import javax.validation.Validator;

@Configuration
public class CommonConfig {

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }

    @Bean
    public ValidatorService validatorService(Validator validator) {
        return new ValidatorService(validator);
    }

    @Bean
    public Profiler profiler() {
        return new Profiler();
    }

    @Bean
    public ModelValidator modelValidator(ValidatorService validatorService) {
        return new ModelValidator(validatorService);
    }

}