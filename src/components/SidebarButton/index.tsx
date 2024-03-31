import React from "react";
import { Link } from "react-router-dom";

//slices
import { useAppDispatch } from "../../store/store";
import { setIsShrinkView } from "../../store/theme/themeSlice";

type SidebarButtonProps = {
  text: string;
  svg: any;
  link: string;
  clickButton: string;
  setClickButton: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({
  text,
  svg,
  link,
  clickButton,
  setClickButton,
}) => {
  const dispatch = useAppDispatch();

  const onClickLink = (link: string) => {
    dispatch(setIsShrinkView(true));
    setClickButton(link);
  };

  return (
    <>
      <li
        className={`sidebar-listItem${clickButton === link ? " active" : ""}`}
      >
        <Link onClick={() => onClickLink(link)} to={link}>
          {svg}
          <span className="sidebar-listItemText">{text}</span>
        </Link>
      </li>
    </>
  );
};

export default SidebarButton;
