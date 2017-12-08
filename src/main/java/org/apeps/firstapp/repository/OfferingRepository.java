package org.apeps.firstapp.repository;

import org.apeps.firstapp.domain.Offering;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Offering entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferingRepository extends JpaRepository<Offering, Long> {

}
