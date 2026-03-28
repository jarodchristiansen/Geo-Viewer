interface TimeButtonsProps {
  availTimes: number[];
  setTimeQuery: (time: number) => void;
  refetch: (variables?: { time: number }) => Promise<unknown>;
}

const TimeButtons = ({
  availTimes,
  setTimeQuery,
  refetch,
}: TimeButtonsProps) => {
  return (
    <div>
      {availTimes?.map((time) => (
        <button
          key={time}
          className="standardized-button"
          onClick={() => {
            setTimeQuery(time);
            void refetch({ time });
          }}
        >
          -{time}-
        </button>
      ))}
    </div>
  );
};

export default TimeButtons;
