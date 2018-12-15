package co.inventorsoft.scripty.repository;

import java.util.List;

import co.inventorsoft.scripty.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long>, JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.user.id = :#{#userId}")
    List<Comment> findByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("delete from Comment c where c.id = :#{#commentId} AND c.user.id = :#{#userId}")
    void deleteByUserId(@Param("commentId") Long commentId, @Param("userId") Long userId);
}
