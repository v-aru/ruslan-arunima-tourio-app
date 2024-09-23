import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";
import { Preloader } from "../../../components/Preloader.js";

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
  justify-content: center;
  border: 3px solid #0A1045;
  background-color: #9DBEBB;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 0.4rem;
`;

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
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

  if (!isReady || isLoading) return <Preloader />;
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
        <StyledLink justifySelf="start">
          <StyledIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="black" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          </StyledIcon> 
          &nbsp;&nbsp;Back
        </StyledLink>
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
      <TitleContainer>
        <h2>
          {name}, {location}
        </h2>
        <Link href={mapURL} passHref legacyBehavior>
          <StyledLocationLink>Location on Google Maps</StyledLocationLink>
        </Link>
      </TitleContainer>
      <p>{description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit &nbsp;
            <StyledIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
            </StyledIcon>
          </StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete &nbsp;
          <StyledIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </StyledIcon>
        </StyledButton>
      </ButtonContainer>
      <Comments locationName={name} comments={placeComments || []} />
    </>
  );
}
