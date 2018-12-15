package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.model.entity.Comment;

import java.util.List;

public interface CommentService {
    public List<Comment> getComments();

    public void add(Comment comment);

    public void delete(Long id);

    public void findById(Long id);

    public List<Comment> getCommentsByUserId(Long userId);

    public void delete(Long commentId, Long userId);
}
