import { Pagination } from "react-bootstrap";

interface PaginationComponentProps {
  active: number;
  setOffsetState: (n: number) => void;
  refetch: (variables?: { offset: number }) => Promise<unknown>;
}

const PaginationComponent = ({
  active,
  setOffsetState,
  refetch,
}: PaginationComponentProps) => {
  const items = [];

  const start = active > 2 ? active - 2 : 1;

  for (let number = start; number <= active + 2; number++) {
    items.push(
      <Pagination.Item
        key={number}
        data-cy={"pagination-page"}
        active={number === active}
        onClick={() => {
          void refetch({ offset: number });
          setOffsetState(number);
        }}
        data-testid={`pagination-key-${number}`}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div data-testid={"pagination-component"}>
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            void refetch({ offset: active - 1 });
            setOffsetState(active - 1);
          }}
          data-testid={"pagination-key-previous"}
        />
        {items}
        <Pagination.Next
          onClick={() => {
            void refetch({ offset: active + 1 });
            setOffsetState(active + 1);
          }}
          data-testid={"pagination-key-next"}
        />
      </Pagination>
      <br />
    </div>
  );
};

export default PaginationComponent;
