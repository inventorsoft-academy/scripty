package co.inventorsoft.scripty.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import co.inventorsoft.scripty.model.entity.Project;
import co.inventorsoft.scripty.model.entity.User;

import static java.util.Objects.isNull;


public class ProjectFilter {

    final static boolean ARCHIVE_DEFAULT_VALUE = false;
    final static int VISIBILITY_PUBLIC_VALUE = 1;
    final static int LOWER_BOUND_FOR_PROJECT_ID_ADMIN_TO_VIEW_ALL_PROJECTS = 1;

    public static Specification<Project> getFilter(User user) {

        if (isNull(user)) {
            return new Specification<Project>() {
                @Override
                public Predicate toPredicate(Root<Project> root,
                                             CriteriaQuery<?> criteriaQuery,
                                             CriteriaBuilder criteriaBuilder) {
                    return criteriaBuilder.and(
                            criteriaBuilder.equal(root.get("visibility"), VISIBILITY_PUBLIC_VALUE),
                            criteriaBuilder.equal(root.get("archive"), ARCHIVE_DEFAULT_VALUE)
                    );

                }
            };
        } else if (user.getRole().equals("ROLE_USER")) {

            return new Specification<Project>() {
                @Override
                public Predicate toPredicate(Root<Project> root,
                                             CriteriaQuery<?> criteriaQuery,
                                             CriteriaBuilder criteriaBuilder) {
                    return criteriaBuilder.or(criteriaBuilder.equal(root.get("visibility"), VISIBILITY_PUBLIC_VALUE),
                            criteriaBuilder.equal(root.get("user").get("id"), user.getId()));


                }
            };

        } else {

            return new Specification<Project>() {
                @Override
                public Predicate toPredicate(Root<Project> root,
                                             CriteriaQuery<?> criteriaQuery,
                                             CriteriaBuilder criteriaBuilder) {
                    return criteriaBuilder.greaterThanOrEqualTo(root.get("id"),
                                             LOWER_BOUND_FOR_PROJECT_ID_ADMIN_TO_VIEW_ALL_PROJECTS);

                }
            };

        }

    }

}
