package co.inventorsoft.scripty.service;

import co.inventorsoft.scripty.model.entity.Comment;
import co.inventorsoft.scripty.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Override
    public List<Comment> getComments() {
        return (List<Comment>) commentRepository.findAll();
    }

    @Override
    public void add(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public void delete(Long id) {
        commentRepository.deleteById(id);

    }

    @Override
    public void findById(Long id) {
        commentRepository.findById(id);

    }

    @Override
    public List<Comment> getCommentsByUserId(Long userId) {
        return commentRepository.findByUserId(userId);
    }

    @Override
    public void delete(Long commentId, Long userId) {
        commentRepository.deleteByUserId(commentId, userId);
    }



}
