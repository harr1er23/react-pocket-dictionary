import { useEffect, useState } from "react";
import "./Pagination.scss";

const iconPaths = {
  left:
    "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z",
  right:
    "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z",
  dbLeft:
    "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z",
  dbRight:
    "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
};

type IconProps = {
  iconPath: string
}

const Icon = ({ iconPath } : IconProps) => (
  <svg
    viewBox="64 64 896 896"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={iconPath}></path>
  </svg>
);

const FAST_BACKWARD_VALUE = -1;
const FAST_FORWARD_VALUE = -2;
const MAX_TO_SHOW = 5;
const getPageOptions = (pageIndex: number, pageCount: number) => {
  let left = pageIndex - 1;
  let right = pageIndex + 1;
  const pageIndices = [pageIndex];
  while (
    pageIndices.length < MAX_TO_SHOW &&
    (left >= 0 || right <= pageCount - 1)
  ) {
    if (left >= 0) {
      pageIndices.unshift(left);
      left -= 1;
    }
    if (right <= pageCount - 1) {
      pageIndices.push(right);
      right += 1;
    }
  }
  if (pageIndices[0] > 0) {
    if (pageIndices[0] > 1) {
      pageIndices.unshift(FAST_BACKWARD_VALUE);
    }
    pageIndices.unshift(0);
  }
  if (pageIndices[pageIndices.length - 1] < pageCount - 1) {
    if (pageIndices[pageIndices.length - 1] < pageCount - 2) {
      pageIndices.push(FAST_FORWARD_VALUE);
    }
    pageIndices.push(pageCount - 1);
  }
  return pageIndices;
};

type PaginationProps = {
  pageIndex: number, 
  pageCount: number, 
  onChange: (index: number) => void
}

const Pagination = ({ pageIndex, pageCount, onChange } : PaginationProps) => {
  // state to manage current page index
  const [currentIndex, setCurrentIndex] = useState(pageIndex);
  // page options will generate when currentIndex changed
  const pageOptions = getPageOptions(currentIndex, pageCount);

  // update state when pageIndex from props has changed
  useEffect(() => {
    setCurrentIndex(pageIndex);
  }, [pageIndex]);

  // change handler to check if the value still in valid range
  const handlePageChanged = (index: number) => {
    let newIndex = index;
    if (newIndex > pageCount - 1) {
      newIndex = pageCount - 1;
    } else if (newIndex < 0) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
    onChange(newIndex);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentIndex === 0}
        onClick={() => handlePageChanged(currentIndex - 1)}
      >
        <Icon iconPath={iconPaths.left} />
      </button>
      {pageOptions.map((index) => {
        if (index === FAST_BACKWARD_VALUE) {
          return (
            <button
              key={index}
              onClick={() => handlePageChanged(currentIndex - MAX_TO_SHOW)}
            >
              <Icon iconPath={iconPaths.dbLeft} />
            </button>
          );
        }
        if (index === FAST_FORWARD_VALUE) {
          return (
            <button
              key={index}
              onClick={() => handlePageChanged(currentIndex + MAX_TO_SHOW)}
            >
              <Icon iconPath={iconPaths.dbRight} />
            </button>
          );
        }
        return (
          <button
            key={index}
            className={currentIndex === index ? "active" : ""}
            onClick={() => handlePageChanged(index)}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        disabled={currentIndex === pageCount - 1}
        onClick={() => handlePageChanged(currentIndex + 1)}
      >
        <Icon iconPath={iconPaths.right} />
      </button>
    </div>
  );
};

export default Pagination;