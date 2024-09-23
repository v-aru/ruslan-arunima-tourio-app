import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import { useState } from "react";

export default function Comments({ locationName, comments }) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/places/${id}`);
  const [editCommentId, setEditCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  const Article = styled.article`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 20px;
    text-align: center;
    margin: 30px auto;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  async function handleSubmitComment(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const commentsData = Object.fromEntries(formData);
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        body: JSON.stringify(commentsData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        form.reset();
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditComment (e, commentId) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ comment: newCommentText}),
        headers: {
          "Content-Type" : "application/json",
        },
      });
      if (response.ok) {
        setEditCommentId(null);
        setNewCommentText("");
        mutate();
      }
    } catch (e) {
      console.log(error);
    }
  }

  async function handleDeleteComment (commentId) {
    try {
      const response = await fetch (`/api/comments/${commentId}`, {
        method: "DELETE",
        body: JSON.stringify({ placeId : id}),
        headers: {
          "Content-Type" : "application/json",
        },
      })
      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const startEditing = (commentId, currentComment) => {
    setEditCommentId(commentId);
    setNewCommentText(currentComment);
  };

  return (
    <Article>
      {comments.length > 0 ? (
        <>
          <h2> {comments.length} fans commented on this place:</h2>
          {comments.map(({ _id, name, comment }) => {
            return (
              <div key={_id}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                { editCommentId === _id ? (
                  <>
                    <Input type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
                    <StyledButton onClick={(e) => handleEditComment(e, _id)}> SAVE </StyledButton>
                    <StyledButton onClick={() => setEditCommentId(null)}> CANCEL </StyledButton>
                  </>
                  ) : (
                    <span>{comment}</span>
                    )}
                    <div>
                        <StyledButton onClick={() => startEditing(_id, comment)}>
                          Edit
                        </StyledButton>
                        <StyledButton onClick={() => handleDeleteComment(_id)}>
                          Delete
                        </StyledButton>
                      </div>
              </div>
            );
          })}
        </>
      ) : (
        <h2>Add a comment:</h2>
      )}

      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" required />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." required />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
    </Article>
  );
}
