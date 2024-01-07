import { Colors } from "@/styles/variables";
import styled from "styled-components";

const SelectChip = ({ title, onClick }) => {
  return (
    <ChipWrapper>
      {title?.toUpperCase()}

      {typeof onClick === "function" && <button onClick={onClick}>X</button>}
    </ChipWrapper>
  );
};

const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: ${Colors.accentPurple};
  border: 1px solid black;
  color: white;
  font-weight: bold;
  max-width: 80px;

  button {
    border: none;
    background-color: ${Colors.accentPurple};
    color: white;
    font-weight: bold;
  }
`;

export default SelectChip;
