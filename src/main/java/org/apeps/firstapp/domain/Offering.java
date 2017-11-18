package org.apeps.firstapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Offering.
 */
@Entity
@Table(name = "offering")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Offering implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "offering")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Price> prices = new HashSet<>();

    @ManyToOne
    private Offering offering;

    @OneToMany(mappedBy = "offering")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Offering> childs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Offering name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Offering description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Price> getPrices() {
        return prices;
    }

    public Offering prices(Set<Price> prices) {
        this.prices = prices;
        return this;
    }

    public Offering addPrices(Price price) {
        this.prices.add(price);
        price.setOffering(this);
        return this;
    }

    public Offering removePrices(Price price) {
        this.prices.remove(price);
        price.setOffering(null);
        return this;
    }

    public void setPrices(Set<Price> prices) {
        this.prices = prices;
    }

    public Offering getOffering() {
        return offering;
    }

    public Offering offering(Offering offering) {
        this.offering = offering;
        return this;
    }

    public void setOffering(Offering offering) {
        this.offering = offering;
    }

    public Set<Offering> getChilds() {
        return childs;
    }

    public Offering childs(Set<Offering> offerings) {
        this.childs = offerings;
        return this;
    }

    public Offering addChilds(Offering offering) {
        this.childs.add(offering);
        offering.setOffering(this);
        return this;
    }

    public Offering removeChilds(Offering offering) {
        this.childs.remove(offering);
        offering.setOffering(null);
        return this;
    }

    public void setChilds(Set<Offering> offerings) {
        this.childs = offerings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Offering offering = (Offering) o;
        if (offering.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offering.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offering{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
