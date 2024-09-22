import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function Comments({ locationName, comments }) {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWR(`/api/places/${id}`);

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
                <span>{comment}</span>
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
