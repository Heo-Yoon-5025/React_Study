import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  HashRouter,
  Route,
  Routes,
  NavLink,
  useParams,
} from "react-router-dom";

/** Home 컴포넌트: '/' 경로에서 보여줄 내용 */
function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

/** 샘플 데이터: 각 토픽의 id, 제목, 설명 */
let contents = [
  { id: 1, title: "HTML", description: "HTML is ..." },
  { id: 2, title: "JS", description: "JS is ..." },
  { id: 3, title: "React", description: "React is ..." },
];

/** 개별 토픽 표시 컴포넌트 */
function Topic() {
  // URL 경로 파라미터를 가져옴 (예: /topics/2 → {topic_id: "2"})
  let params = useParams();
  let topic_id = params.topic_id;

  // 전달받은 topic_id와 같은 id를 가진 데이터를 찾음
  const found_topic = contents.find((item) => item.id === Number(topic_id));

  // 없으면 기본값(Sorry/Not Found)을 표시
  const selected_topic = found_topic || {
    title: "Sorry",
    description: "Not Found",
  };

  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}

/** Topics 컴포넌트: 토픽 목록 및 개별 토픽 상세 라우팅 */
function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {/* NavLink를 사용해서 /topics/1, /topics/2, /topics/3 링크 생성 */}
        {contents.map((item) => (
          <li key={item.id}>
            <NavLink to={"/topics/" + item.id}>{item.title}</NavLink>
          </li>
        ))}
      </ul>

      {/* 하위 라우트: /topics/:topic_id 경로에 따라 Topic 컴포넌트 렌더링 */}
      <Routes>
        <Route path="/:topic_id" element={<Topic />} />
      </Routes>
    </div>
  );
}

/** Contact 컴포넌트: '/contact' 경로에서 보여줄 내용 */
function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}

/** 최상위 App 컴포넌트: 네비게이션 메뉴 + 라우트 정의 */
function App() {
  return (
    <>
      <h1>Hello React Router DOM</h1>
      <ul>
        <li>
          {/* / 경로로 이동 */}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          {/* /topics 경로로 이동 */}
          <NavLink to="/topics">Topics</NavLink>
        </li>
        <li>
          {/* /contact 경로로 이동 */}
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <Routes>
        {/* / 경로 → Home */}
        <Route path="/" element={<Home />} />
        {/* /topics/* 경로 → Topics (하위 라우트 포함) */}
        <Route path="/topics/*" element={<Topics />} />
        {/* /contact 경로 → Contact */}
        <Route path="/contact" element={<Contact />} />
        {/* 나머지 모든 경로 → Not Found */}
        <Route path="/*" element={"Not Found"} />
      </Routes>
    </>
  );
}

/** ReactDOM 렌더링: StrictMode + HashRouter로 App 감싸기 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
