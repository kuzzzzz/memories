import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@material-ui/core";

import useStyles from "./styles";
import { commentPost } from "../../actions/post";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComments(newComment);
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInerContainer}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{String(c).split(": ")[0]}</strong>
              {String(c).split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography variant="h6" gutterBottom>
              Write a Comment
            </Typography>
            <TextField
              rows={4}
              fullWidth
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Comments
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
