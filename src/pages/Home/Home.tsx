import React from 'react';

import { ReactComponent as MegaphoneIco } from "../../assets/ico/megaphone.svg";
import { ReactComponent as GoalsIco } from "../../assets/ico/goals.svg";
import { ReactComponent as ProgressIco } from "../../assets/ico/progress.svg";
import { ReactComponent as SettingsIco } from "../../assets/ico/homeSettings.svg";
import { ReactComponent as TelegramIco } from "../../assets/ico/telegram.svg";
import { ReactComponent as VkIco } from "../../assets/ico/vk.svg";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="full-container">
            <div className="banner-background">
                <div className="banner">
                    <div className="logo">
                        <img src="../../assets/logo/Pocket_dictionary.png" alt="Logo" />
                    </div>
                    <div className="banner-content">
                        <h2>Присоединяйтесь к Pocket Dictionary!</h2>
                        <p>
                            Не откладывайте свое обучение на потом – начните прямо сейчас с
                            PocketDictionary. Разблокируйте свой потенциал, обогатите
                            словарный запас и почувствуйте уверенность в общении на английском
                            языке. Учите слова легко, весело и эффективно – с PocketDictionary
                            ваш путь к языковому совершенству начинается здесь!
                        </p>
                    </div>
                    <form id="feedback-form" className="feedback-form">
                        <div className="megaphone-ico">
                            < MegaphoneIco />
                        </div>
                        <h3>Опробуйте продукт уже сегодня</h3>
                        <p>
                            Изучать английский язык теперь не так сложно. Начните обчуение
                            прямо сейчас!
                        </p>
                        <div className="feedback-inputs">
                            {/* <div className="feedback-input">
                                <img src="../../assets/ico/user.png" alt="Ico" />
                                <input placeholder="Ваше имя" id="name" type="text" />
                            </div>
                            <div className="feedback-input">
                                <img src="../../assets/ico/phone.png" alt="Ico" />
                                <input placeholder="Ваша почта" id="email" type="email" />
                            </div>
                            <div className="feedback-input">
                                <img src="../../assets/ico/email.png" alt="Ico" />
                                <input placeholder="Ваш номер телефона" id="phone" type="text" />
                            </div> */}
                            <Link to="/auth" className="feedback-button">Попробовать</Link>
                        </div>
                    </form>
                </div>
            </div>
            <section className="about-project">
                <h2>О Pocket Dictionary</h2>
                <p>
                    Добро пожаловать на <strong>Pocket Dictionary</strong> – ваш путеводитель в
                    мир английского языка! Мы рады представить вам инновационный проект,
                    созданный специально для тех, кто стремится совершенствовать свои
                    навыки в изучении английских слов.
                </p>
                <p>
                    <strong>Pocket Dictionary</strong> – это не просто сайт, это ваш надежный
                    помощник в пути к владению английским языком. Наша цель – сделать
                    изучение новых слов простым, увлекательным и эффективным. Мы
                    объединили в себе современные технологии и методики обучения, чтобы
                    предоставить вам наилучший опыт в области расширения словарного
                    запаса.
                </p>
            </section>
            <section className="goals container">
                <div className="goal-block">
                    <div className="goals-ico">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M7 18.5V21L12 16H20V10M7 16H4V4H20V6" stroke="#000000" stroke-width="0.72" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    <h5 className="goals-title">Персонализированный подход</h5>
                    <div className="goals-description">
                        Мы адаптируемся к вашему темпу обучения и уровню владения языком,
                        предлагая персональные рекомендации и задания.
                    </div>
                </div>
                <div className="goal-block">
                    <div className="goals-ico">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z"
                                    stroke="#000000" stroke-width="0.8399999999999999"></path>
                                <path d="M12 4V3" stroke="#000000" stroke-width="0.8399999999999999" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M18 6L19 5" stroke="#000000" stroke-width="0.8399999999999999" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M20 12H21" stroke="#000000" stroke-width="0.8399999999999999" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M4 12H3" stroke="#000000" stroke-width="0.8399999999999999" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M5 5L6 6" stroke="#000000" stroke-width="0.8399999999999999" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M10 17H14" stroke="#000000" stroke-width="0.8399999999999999" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    <h5 className="goals-title">Интерактивные уроки</h5>
                    <div className="goals-description">
                        Учить слова стало увлекательным! Используйте наши интерактивные
                        уроки, игры и задания для более эффективного запоминания.
                    </div>
                </div>
                <div className="goal-block">
                    <div className="goals-ico">
                        <GoalsIco />
                    </div>
                    <h5 className="goals-title">Постоянное обновление контента</h5>
                    <div className="goals-description">
                        Мы следим за трендами в языке, поэтому вы всегда будете в курсе
                        актуальной лексики.
                    </div>
                </div>
                <div className="goal-block">
                    <div className="goals-ico">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M5.875 12.5729C5.30847 11.2498 5 9.84107 5 8.51463C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51463C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C9.60664 17.2638 8.62102 16.5151 7.79508 15.6"
                                    stroke="#000000" stroke-width="0.9600000000000002" stroke-linecap="round"></path>
                                <path
                                    d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                    stroke="#000000" stroke-width="0.9600000000000002"></path>
                                <path
                                    d="M20.9605 15.5C21.6259 16.1025 22 16.7816 22 17.5C22 18.4251 21.3797 19.285 20.3161 20M3.03947 15.5C2.37412 16.1025 2 16.7816 2 17.5C2 19.9853 6.47715 22 12 22C13.6529 22 15.2122 21.8195 16.5858 21.5"
                                    stroke="#000000" stroke-width="0.9600000000000002" stroke-linecap="round"></path>
                            </g>
                        </svg>
                    </div>
                    <h5 className="goals-title">Доступ в любое время и в любом месте</h5>
                    <div className="goals-description">
                        Pocket Dictionary – всегда под рукой. Обучайтесь в удобное для вас
                        время, будь то дома, в офисе или в пути.
                    </div>
                </div>
            </section>
            <section className="tasks">

                <div className="container">
                    <div className="presentation-text">
                        <h2>Наши цели — ваш успех в изучении английского языка</h2>
                        <p>Познакомьтесь с нашими ключевыми направлениями работы, созданными для того, чтобы сделать ваш языковой
                            опыт с Pocket Dictionary максимально эффективным и увлекательным.</p>
                        <div className="tasks-block">
                            <div className="task-block">
                                <div className="task-block-title">
                                    <SettingsIco />
                                    <h3>Гибкие настройки</h3>
                                </div>
                                <div className="task-block-text">Мы ставим перед собой цель реализовать максимально гибкие настройки, чтобы
                                    вы могли индивидуализировать процесс обучения, подстраивая его под свои потребности и ритм, для
                                    достижения наилучших результатов.</div>
                            </div>
                            <div className="task-block">
                                <div className="task-block-title">
                                    <ProgressIco />
                                    <h3>Отслеживание прогресса</h3>
                                </div>
                                <div className="task-block-text">Мы понимаем, насколько важно видеть свой прогресс. С помощью наших
                                    инструментов мониторинга вы всегда будете в курсе своего развития и сможете адаптировать обучение в
                                    соответствии с достигнутыми результатами.</div>
                            </div>
                            <div className="task-block">
                                <div className="task-block-title">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235"
                                                stroke="#000000" stroke-width="1.224"></path>
                                            <path d="M8 7H16" stroke="#000000" stroke-width="1.224" stroke-linecap="round"></path>
                                            <path d="M8 10.5H13" stroke="#000000" stroke-width="1.224" stroke-linecap="round"></path>
                                            <path
                                                d="M13 16V19.5309C13 19.8065 13 19.9443 12.9051 20C12.8103 20.0557 12.6806 19.9941 12.4211 19.8708L11.1789 19.2808C11.0911 19.2391 11.0472 19.2182 11 19.2182C10.9528 19.2182 10.9089 19.2391 10.8211 19.2808L9.57889 19.8708C9.31943 19.9941 9.18971 20.0557 9.09485 20C9 19.9443 9 19.8065 9 19.5309V16.45"
                                                stroke="#000000" stroke-width="1.224" stroke-linecap="round"></path>
                                            <path
                                                d="M10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8M14 22C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12"
                                                stroke="#000000" stroke-width="1.224" stroke-linecap="round"></path>
                                        </g>
                                    </svg>
                                    <h3>Расширение словарного запаса</h3>
                                </div>
                                <div className="task-block-text">Наша третья цель – помочь вам расширить свой словарный запас. Мы постоянно
                                    обновляем контент, предоставляя актуальные слова и выражения, необходимые в современном мире.</div>
                            </div>
                            <div className="task-block">
                                <div className="task-block-title">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M14.2495 2H8.49395C8.31447 2 8.22473 2 8.14551 2.02733C8.07544 2.05149 8.01163 2.09093 7.95868 2.14279C7.89881 2.20143 7.85868 2.2817 7.77841 2.44223L3.57841 10.8422C3.38673 11.2256 3.29089 11.4173 3.31391 11.5731C3.33401 11.7091 3.40927 11.8309 3.52197 11.9097C3.65104 12 3.86534 12 4.29395 12H10.4995L7.49953 22L19.6926 9.35531C20.104 8.9287 20.3097 8.7154 20.3217 8.53288C20.3321 8.37446 20.2667 8.22049 20.1454 8.11803C20.0057 8 19.7094 8 19.1167 8H11.9995L14.2495 2Z"
                                                stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                    <h3>Стимулирование постоянного обучения</h3>
                                </div>
                                <div className="task-block-text">Еще одна наша цель заключается в поощрении постоянного обучения. Мы
                                    стремимся создать среду, в которой пользователи не только учат новые слова, но и постоянно
                                    поддерживают и углубляют свои знания, поощряя привычку к ежедневному обучению.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="subscription-calculator">
                <h2>Выберите свой тарифный план</h2>
                <div className="subscription-plans">
                    <div className="plan-background">
                        <div className="plan-title">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <circle cx="12" cy="9" r="3" stroke="#000000" stroke-width="1.5"></circle>
                                    <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                                        stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path
                                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                        stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                                </g>
                            </svg>
                            <p>STARTER</p>
                            <h2>$10.99</h2>
                            <p>per month</p>
                            <div className="feedback-button">Оформить подписку</div>
                        </div>
                        <ul className="plan-options">
                            <li><strong className="plan-options-text">Доступ к базовым урокам и играм</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Хранилище размером в 10 тысяч слов</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Полноценный мобильный доступ</strong><svg fill="#05d561" version="1.1"
                                id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                        </ul>
                    </div>
                    <div className="plan-background">
                        <div className="plan-title">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M5 22V14M5 14L7.47067 13.5059C9.1212 13.1758 10.8321 13.3328 12.3949 13.958C14.0885 14.6354 15.9524 14.7619 17.722 14.3195L17.8221 14.2945C18.4082 14.148 18.6861 13.4769 18.3753 12.9589L16.8147 10.3578C16.4732 9.78863 16.3024 9.50405 16.2619 9.19451C16.2451 9.06539 16.2451 8.93461 16.2619 8.80549C16.3024 8.49595 16.4732 8.21137 16.8147 7.64221L18.0932 5.51132C18.4278 4.9536 17.9211 4.26972 17.2901 4.42746C15.8013 4.79967 14.2331 4.69323 12.8082 4.12329L12.3949 3.95797C10.8321 3.33284 9.1212 3.17576 7.47067 3.50587L5 4M5 14V11M5 4V2M5 4V7"
                                        stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                                </g>
                            </svg>
                            <p>PROFESSIONAL</p>
                            <h2>$36.99</h2>
                            <p>per month</p>
                            <div className="feedback-button">Оформить подписку</div>
                        </div>
                        <ul className="plan-options">
                            <li><strong className="plan-options-text">Хранилище размером в 20 тысяч слов</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Доступ к библиотеке дополнительных языков</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Неограниченный доступ ко всем урокам</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Доступ к статистике и прогрессу</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                        </ul>
                    </div>
                    <div className="plan-background">
                        <div className="plan-title">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M21.8382 11.1263C22.0182 9.2137 22.1082 8.25739 21.781 7.86207C21.604 7.64823 21.3633 7.5172 21.106 7.4946C20.6303 7.45282 20.0329 8.1329 18.8381 9.49307C18.2202 10.1965 17.9113 10.5482 17.5666 10.6027C17.3757 10.6328 17.1811 10.6018 17.0047 10.5131C16.6865 10.3529 16.4743 9.91812 16.0499 9.04851L13.8131 4.46485C13.0112 2.82162 12.6102 2 12 2C11.3898 2 10.9888 2.82162 10.1869 4.46486L7.95007 9.04852C7.5257 9.91812 7.31351 10.3529 6.99526 10.5131C6.81892 10.6018 6.62434 10.6328 6.43337 10.6027C6.08872 10.5482 5.77977 10.1965 5.16187 9.49307C3.96708 8.1329 3.36968 7.45282 2.89399 7.4946C2.63666 7.5172 2.39598 7.64823 2.21899 7.86207C1.8918 8.25739 1.9818 9.2137 2.16181 11.1263L2.391 13.5616C2.76865 17.5742 2.95748 19.5805 4.14009 20.7902C5.32271 22 7.09517 22 10.6401 22H13.3599C16.9048 22 18.6773 22 19.8599 20.7902C20.7738 19.8553 21.0942 18.4447 21.367 16"
                                        stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path d="M9 18H15" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
                                </g>
                            </svg>
                            <p>ENTERPRISE</p>
                            <h2>$110</h2>
                            <p>per month</p>
                            <div className="feedback-button">Оформить подписку</div>
                        </div>
                        <ul className="plan-options">
                            <li><strong className="plan-options-text">Неограниченное хранилище слов</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Полная статистика на каждый день</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Эксклюзивные уроки и материалы</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Персональный репетитор</strong><svg fill="#05d561" version="1.1"
                                id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                            <li><strong className="plan-options-text">Первенство в обновлениях контента</strong><svg fill="#05d561"
                                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 567.123 567.123" xmlSpace="preserve" stroke="#05d561" stroke-width="28.356150000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <path
                                                d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="team container">
                <h2>Наша команда</h2>
                <div className="team-blocks">
                    <div className="team-block">
                        <img src="../../assets/photo/alex.jpg" alt="Photo" className="team-photo" />
                        <h3>Зубов Александр</h3>
                        <p>Team Leader, Frontend Developer</p>
                    </div>
                    <div className="team-block">
                        <img src="../../assets/photo/vlad.jpg" alt="Photo" className="team-photo" />
                        <h3>Оганесян Влад</h3>
                        <p>Designer, Developer</p>
                    </div>
                    <div className="team-block">
                        <img src="../../assets/photo/danil.jpg" alt="Photo" className="team-photo" />
                        <h3>Панько Данил</h3>
                        <p>Copiwriter</p>
                    </div>
                </div>
            </section>
            <section className="footer">
                <div className="footer-text">
                    Copyright © 2023 PocketDictionary. Все права защищены.
                </div>
                <div className="social">
                    <div className="social-ico">
                        <TelegramIco />
                    </div>
                    <div className="social-ico">
                        <VkIco />
                    </div>
                    <div className="social-ico">
                        <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-271 311.2 256 179.8" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-59.1,311.2h-167.8c0,0-44.1,0-44.1,44.1v91.5c0,0,0,44.1,44.1,44.1h167.8c0,0,44.1,0,44.1-44.1v-91.5 C-15,355.3-15,311.2-59.1,311.2z M-177.1,450.3v-98.5l83.8,49.3L-177.1,450.3z"></path> </g></svg>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;