package org.apeps.firstapp.repository;

import org.apeps.firstapp.domain.Price;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Price entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

}
