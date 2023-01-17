import { applyFontKind, Button } from "@ryfylke-react/ui";
import styled from "styled-components";
import { TimelineItem } from "./Timeline";

type Props = {
  items: TimelineItem[];
};

export const HorizontalPortfolio = (props: Props) => {
  return (
    <>
      <Header>
        <h3>Experience</h3>
      </Header>
      <Container>
        {props.items.map((item) => {
          const isCurrent =
            typeof item.subTitle === "string" &&
            item.subTitle.endsWith("now");
          return (
            <Item key={item.id} isCurrent={isCurrent}>
              <h3>{item.title}</h3>
              <time>{item.subTitle}</time>
              <p>{item.body}</p>
              <Button kind="ghost">Read more</Button>
            </Item>
          );
        })}
      </Container>
    </>
  );
};

const Header = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  > h3 {
    font-size: 2.5rem;
    color: var(--c-text-01);
  }
`;

const Container = styled.ul`
  display: flex;
  list-style: none;
  gap: var(--s-07);
  overflow-x: auto;
  margin: 0;
  padding: var(--s-07) var(--s-09);

  --scrollbar-bg: var(--c-ui-bg);
  --scrollbar-border-color: var(--scrollbar-bg);
  --scrollbar-color: var(--c-ui-02);
  scrollbar-width: auto;
  scrollbar-color: var(--scrollbar-color) var(--scrollbar-bg);
  &::-webkit-scrollbar {
    width: 12px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--scrollbar-bg);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 10px;
    border: 2px solid var(--scrollbar-border-color);
  }
  button {
    margin-top: auto;
  }
`;

const Item = styled.li<{
  isCurrent: boolean;
}>`
  padding: var(--s-07);
  background: ${(props) =>
    props.isCurrent ? "var(--c-ui-02)" : "var(--c-ui-01)"};
  min-width: 350px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: var(--s-04);
  h3 {
    ${applyFontKind("subtitle")}
    margin:0;
  }
  time {
    ${applyFontKind("small")}
    color: var(--c-text-03);
  }
  p {
    margin: 0;
    ${applyFontKind("body")}
    color: var(--c-text-02);
  }
`;
