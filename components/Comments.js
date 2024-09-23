import styled from "styled-components";
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

  const FormContainer = styled.form`
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
  `;

  const FormRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  `;

  const Label = styled.label`
    flex: 0 0 150px;
  `;

  const Input = styled.input`
    flex: 1;
    max-width: 300px;
    padding: 8px;
    border-radius: 10px;
    border: 2px solid black;
  `;

  const CommentField = styled.textarea`
    resize: both;
    border: 2px solid black;
    border-radius: 10px;
    padding: 8px;
    max-width: 700px;
    flex: 1;
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

  // async function handleEditComment (e, commentId) {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`/api/comments/${commentId}`, {
  //       method: "PUT",
  //       body: JSON.stringify({ comment: newCommentText}),
  //       headers: {
  //         "Content-Type" : "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       setEditCommentId(null);
  //       setNewCommentText("");
  //       mutate();
  //     }
  //   } catch (e) {
  //     console.log(error);
  //   }
  // }

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

  // const startEditing = (commentId, currentComment) => {
  //   setEditCommentId(commentId);
  //   setNewCommentText(currentComment);
  // };

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
                    <Input type="text" value={newCommentText} onChange={(e) => { setNewCommentText(e.target.value); console.log("Updated Comment Text:", e.target.value)}} />
                    &nbsp;
                    <StyledButton onClick={(e) => handleEditComment(e, _id)}> Save </StyledButton> 
                    &nbsp;
                    <StyledButton onClick={() => setEditCommentId(null)}> Cancel </StyledButton>
                  </>
                  ) : (
                    <span>{comment}</span>
                    )}
                    <div>
                        {/* <StyledButton onClick={() => startEditing(_id, comment)}>
                          Edit
                        </StyledButton> &nbsp; */}
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
      <br /> 
      <FormContainer onSubmit={handleSubmitComment}>

        <FormRow>
          <Label htmlFor="name"><strong>Your Name: &nbsp;</strong></Label>
          <Input type="text" name="name" placeholder="Enter username" required /> 
        </FormRow>

        <FormRow>
          <Label htmlFor="comment"><strong>Your Comment: &nbsp;</strong></Label>
          <CommentField type="text" name="comment" placeholder="Enter your comment here..." required /> 
        </FormRow>
        
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
    </Article>
  );
}
