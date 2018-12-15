package co.inventorsoft.scripty.controller;

import co.inventorsoft.scripty.model.entity.Comment;
import co.inventorsoft.scripty.model.entity.User;
import co.inventorsoft.scripty.service.CommentService;
import co.inventorsoft.scripty.service.SecurityService;
import co.inventorsoft.scripty.service.UserService;
import co.inventorsoft.scripty.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentService commentService;
    @Autowired
    UserService userService;


    private User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();

        return userService.findByUserName(name);
    }


    @RequestMapping("/comments")
    public List<Comment> getComments() {

        return commentService.getComments();
    }

    @RequestMapping(value = "/comments", method = RequestMethod.POST)
    public Comment addComment(@RequestBody Comment comment) {

        commentService.add(comment);
        return comment;
    }


    @RequestMapping(value = "/commentsId", method = RequestMethod.GET)
    public List<Comment> getCommentsUserId(@RequestParam("userId") Long id) {

        List<Comment> comments = commentService.getCommentsByUserId(id);

        if (comments.isEmpty()) {
            throw new CommentNotFoundException("no comments for user id = " + id);
        }

        return comments;
    }

    @RequestMapping(value = "/comments/{id}", method = RequestMethod.DELETE)
    public String deleteCommentByUserId(@PathVariable Long id) {

        User user = getUser();
        Long userId = user.getId();

          // Long userId = 1000l;

        commentService.delete(id, userId);
        return "Deleted comment id - " + id;
    }

}

