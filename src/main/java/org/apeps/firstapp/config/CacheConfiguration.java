package org.apeps.firstapp.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Offering.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Offering.class.getName() + ".prices", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Offering.class.getName() + ".childs", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Price.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Item.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Category.class.getName() + ".items", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Customer.class.getName() + ".items", jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Cart.class.getName(), jcacheConfiguration);
            cm.createCache(org.apeps.firstapp.domain.Cart.class.getName() + ".items", jcacheConfiguration);

            // jhipster-needle-ehcache-add-entry
        };
    }
}
