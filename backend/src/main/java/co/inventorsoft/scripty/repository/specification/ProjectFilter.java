package co.inventorsoft.scripty.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;


public class ProjectFilter {

    final static int VISIBILITY_SET_TO_PUBLIC = 1;
    final static int VISIBILITY_FOR_ADMIN_PROJECTID_GREATER_THAN = 1;

    public static Specification<Project> getFilter(User user) {

        String role = user.getRole();

        if (role.equals("ROLE_USER")) {

            return new Specification<Project>() {
                @Override
                public Predicate toPredicate(Root<Project> root,
                                             CriteriaQuery<?> criteriaQuery,
                                             CriteriaBuilder criteriaBuilder) {
                    return criteriaBuilder.or(criteriaBuilder.equal(root.get("visibility"), VISIBILITY_SET_TO_PUBLIC),
                            criteriaBuilder.equal(root.get("user").get("id"), user.getId()));
                }
            };

        } else if (role.equals("ROLE_ADMIN")) {

            return new Specification<Project>() {
                @Override
                public Predicate toPredicate(Root<Project> root,
                                             CriteriaQuery<?> criteriaQuery,
                                             CriteriaBuilder criteriaBuilder) {
                    return criteriaBuilder.greaterThanOrEqualTo(root.get("id"), VISIBILITY_FOR_ADMIN_PROJECTID_GREATER_THAN);
                }
            };
        }

        return new Specification<Project>() {
            @Override
            public Predicate toPredicate(Root<Project> root,
                                         CriteriaQuery<?> criteriaQuery,
                                         CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("visibility"), VISIBILITY_SET_TO_PUBLIC);
            }
        };
    }
}
