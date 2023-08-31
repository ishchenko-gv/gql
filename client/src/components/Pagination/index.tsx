type Props = {
  currentPage: number;
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export default function Pagination(props: Props) {
  const {
    currentPage,
    isPrevBtnDisabled,
    isNextBtnDisabled,
    onPrevClick,
    onNextClick,
  } = props;

  return (
    <div className="join">
      <button
        className="join-item btn"
        disabled={isPrevBtnDisabled}
        onClick={onPrevClick}
      >
        «
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        className="join-item btn"
        disabled={isNextBtnDisabled}
        onClick={onNextClick}
      >
        »
      </button>
    </div>
  );
}
