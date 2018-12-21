package co.inventorsoft.scripty.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;


public class Filter {
	
	public static Specification<Project> getFilter(User user) {
		
		String role = user.getRole();
		//Long userId = user.getId();
		
		if (role.equals("ROLE_USER")) {
			
			return new Specification<Project>() {
	            @Override
	            public Predicate toPredicate(Root<Project> root,
	                    CriteriaQuery<?> criteriaQuery,
	                    CriteriaBuilder criteriaBuilder) {
	                return criteriaBuilder.or(criteriaBuilder.equal(root.get("visibility"), 1), 
	                		criteriaBuilder.equal(root.get("user").get("id"), user.getId()));
	                		
	             		
	            }
	        };		
		
		} else if (role.equals("ROLE_ADMIN")) {
			
			return new Specification<Project>() {
	            @Override
	            public Predicate toPredicate(Root<Project> root,
	                    CriteriaQuery<?> criteriaQuery,
	                    CriteriaBuilder criteriaBuilder) {
	                return criteriaBuilder.greaterThanOrEqualTo(root.get("id"), 1); 	                		
	               	
	            }
	        };		
			
		}
		
		return new Specification<Project>() {
	        @Override
	        public Predicate toPredicate(Root<Project> root,
	                CriteriaQuery<?> criteriaQuery,
	                CriteriaBuilder criteriaBuilder) {
	            return criteriaBuilder.equal(root.get("visibility"), 1); 
	            		
	            		
	         		
	        }
	    };		
		
	}

}
