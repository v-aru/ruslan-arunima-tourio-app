import Link from "next/link.js";
import styled from "styled-components";
import { StyledImage } from "./StyledImage.js";

const Article = styled.article`
  padding: 0px;
  background: #fff;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.5);
  padding-bottom: 24px;
  p {
    padding: 0px 20px;
    margin: 0px;
    margin-top: 8px;
    opacity: 0.7;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  &:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 60%;
  }
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
  figcaption {
    padding: 10px 20px 0px 20px;
    font-weight: 700;
  }
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Card({ name, image, location, id }) {
  return (
    <Article>
      <Figure>
        <ImageContainer>
          <StyledImage
            src={image}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt=""
          />
        </ImageContainer>
        <figcaption>{name}</figcaption>
      </Figure>
      <p>Location: {location}</p>
      <Link href={`places/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  );
}
