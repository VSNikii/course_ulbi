import { getPagesArray } from '../../../utils/pages';
import { MyButton } from '../button/MyButton';

export function Pagination({ onClickPagination, page, totalPages }) {
  let pagesArray = getPagesArray(totalPages);
  return (
    <>
      {pagesArray.map((p) => (
        <MyButton
          key={p}
          style={page === p ? { border: '3px solid' } : null}
          onClick={() => onClickPagination(p)}>
          {p}
        </MyButton>
      ))}
    </>
  );
}
