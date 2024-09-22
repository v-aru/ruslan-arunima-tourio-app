import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(isReady ? `/api/places/${id}` : null);

  const comments = data?.comments || [];
  const { data: placeComments } = useSWR(
    comments.length > 0 ? `/api/comments?ids=${comments.join(",")}` : null
  );

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading place details</h2>;

  const { description, image, location, mapURL, name } = data;

  async function deletePlace() {
    if (confirm("Are you sure?")) {
      const response = await fetch(`/api/places/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/");
      }
    }
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {name}, {location}
      </h2>
      <Link href={mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link>
      <p>{description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Comments locationName={name} comments={placeComments || []} />
    </>
  );
}
