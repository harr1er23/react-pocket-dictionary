import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Sidebar.scss";

import SidebarButton from "../SidebarButton";

import { ReactComponent as DictionaryIco } from "../../assets/ico/dictionary.svg";
import { ReactComponent as ExercisesIco } from "../../assets/ico/exercise.svg";
import { ReactComponent as StatisticsIco } from "../../assets/ico/statistics.svg";

import { ReactComponent as ShowArrowIco } from "../../assets/ico/showArrow.svg";
import { ReactComponent as MobileMenuIco } from "../../assets/ico/mobileMenu.svg";
import { ReactComponent as SettingsIco } from "../../assets/ico/settings.svg";
import { ReactComponent as ExitIco } from "../../assets/ico/exit.svg";
import { ReactComponent as NightIco } from "../../assets/ico/night.svg";
import { ReactComponent as DayIco } from "../../assets/ico/day.svg";

import {
  setIsShrinkView,
  setIsDarkMode,
  selectTheme,
} from "../../store/theme/themeSlice";
import { selectUser, setUser } from "../../store/user/userSlice";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);
  const { isDarkMode, isShrinkView } = useSelector(selectTheme);
  const [showExit, setShowExit] = React.useState(false);

  const [clickButton, setClickButton] = React.useState(
    window.location.pathname.split("/")[2]
  );

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleSidebarView = () => {
    dispatch(setIsShrinkView(!isShrinkView));
  };

  const handleThemeChange = () => {
    dispatch(setIsDarkMode());
    document.body.classList.toggle("dark");
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !event.composedPath().includes(sidebarRef.current)
      ) {
        dispatch(setIsShrinkView(true));
        setShowExit(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [dispatch]);

  const onClickExit = () => {
    localStorage.clear();
    navigate("/auth");
    dispatch(setUser(null));
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar-container${isShrinkView ? " shrink" : ""}`}
    >
      <button
        className="sidebar-viewButton"
        type="button"
        aria-label={isShrinkView ? "Expand Sidebar" : "Shrink Sidebar"}
        title={isShrinkView ? "Показать" : "Скрыть"}
        onClick={handleSidebarView}
      >
        <ShowArrowIco />
      </button>
      <div onClick={handleSidebarView} className={"sidebar-mobile-menu"}>
        <MobileMenuIco />
      </div>
      <div className="sidebar-wrapper">
        <div className="sidebar-themeContainer">
          <label
            data-labelfor="theme-toggle"
            className={`sidebar-themeLabel${isDarkMode ? " switched" : ""}`}
          >
            <input
              className="sidebar-themeInput"
              type="checkbox"
              id="theme-toggle"
              onChange={handleThemeChange}
            />
            <div className="sidebar-themeType light">
              <DayIco />
            </div>
            <div className="sidebar-themeType dark">
              <NightIco />
            </div>
          </label>
        </div>
        <ul className="sidebar-list">
          <SidebarButton
            svg={<DictionaryIco className="noFillIco"/>}
            text={"Мой словарь"}
            link={"dictionary"}
            clickButton={clickButton}
            setClickButton={setClickButton}
          />
          <SidebarButton
              svg={<ExercisesIco className="noFillIco"/>}
              text={"Упражнения"}
              link={"exercises"}
              clickButton={clickButton}
              setClickButton={setClickButton}
            />
          <SidebarButton
            svg={<StatisticsIco className="noFillIco"/>}
            text={"Статистика"}
            link={"statistics"}
            clickButton={clickButton}
            setClickButton={setClickButton}
          />
          <SidebarButton
            svg={<SettingsIco className="noFillIco"/>}
            text={"Настройки"}
            link={"settings"}
            clickButton={clickButton}
            setClickButton={setClickButton}
          />
        </ul>
        {showExit && (
          <div className="exitBlock">
            <div className="sidebar-listItem">
              <div onClick={() => onClickExit()}>
                <span className="sidebar-listItemText">Выход</span>
                <ExitIco className="exitImg" />
              </div>
            </div>
          </div>
        )}
        <div
          onClick={() => setShowExit(!showExit)}
          className="sidebar-profileSection"
        >
          <img
            src="https://assets.codepen.io/3306515/i-know.jpg"
            width="40"
            height="40"
            alt="Monica Geller"
          />
          <span>{user?.data.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;