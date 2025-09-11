import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

/** 머릿글: 제목 클릭 시 WELCOME 모드로 이동 */
function Header(props) {
  console.log('Header props ::: ', props);
  return (
    <header>
      <h1><a href='/' onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  );
}

/** 네비게이션: topics 배열을 목록으로 렌더, 클릭 시 READ 모드 + 선택 id 설정 */
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={'/read/' + t.id} onClick={(event) => {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>);
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

/** 본문 표시: 전달받은 제목/본문 그대로 출력 */
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

/** 글 생성 폼: 제출 시 상위 onCreate(title, body) 호출 */
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
        console.log('Create title ::: ', title);
        console.log('Create body ::: ', body);
      }}>
        <p><input type='text' name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='Create' /></p>
      </form>
    </article>
  );
}

/** 업데이트 폼: 제출 시 상위 onUpdate(title, body) 호출 */
function Update(props) {
  // 부모 컴포넌트로부터 전달받은 초기값(props.title, props.body)을
  // useState로 상태화 → 폼 입력을 Controlled Component로 관리
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      {/* 폼 제출 시 실행될 이벤트 핸들러 */}
      <form onSubmit={event => {
        event.preventDefault();          // 기본 동작(페이지 새로고침) 방지
        props.onUpdate(title, body);     // 부모에게 업데이트 요청 전달
        console.log('Update title ::: ', title);
        console.log('Update body ::: ', body);
      }}>
        {/* value={props.title}, value={props.body}를 지정했는데 onChange 핸들러가 없음 → 사용자가 입력 */}
        {/* React 입장에서는 이건 읽기 전용(Read-only) 필드라고 판단하고 경고함. */}
        <p><input type='text' name='title' placeholder='title' value={title} onChange={event => setTitle(event.target.value)} /></p>
        <p><textarea name='body' placeholder='body' value={body} onChange={event => setBody(event.target.value)}></textarea></p>
        <p><input type='submit' value='Update' /></p>
      </form>
    </article>

  )
}

/** 앱 루트: mode(화면 상태), id(선택 항목), topics(글 목록) 관리 */
function App() {
  // 화면 모드: "WELCOME" | "READ" | "CREATE"
  const [mode, setMode] = useState("WELCOME");
  // 현재 읽을 항목의 id
  const [id, setId] = useState(null);
  // 새 항목에 부여할 다음 id
  const [nextId, setNextId] = useState(4);
  // 글 목록 상태
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: 'html is...' },
    { id: 2, title: "css", body: 'css is...' },
    { id: 3, title: "javascript", body: 'javascript is...' }
  ]);

  let content = null;
  let contextControl = null;

  // 모드별로 content 결정
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === "READ") {
    // 선택된 id에 해당하는 항목을 topics에서 찾음
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body; // 찾았으면 루프 종료 (미세 최적화)
        break;
      }
    }
    console.log('Article title ::: ', title);
    console.log('Article body ::: ', body);
    content = <Article title={title} body={body}></Article>

    contextControl = (<>
     {/* 생성 링크: 클릭 시 UPDATE 모드로 */}
      <li><a href={'/update/' + id} onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={() => {
        const newTopics = []
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        console.log('Delete title ::: ', title);
        console.log('Delete body ::: ', body);
        setTopics(newTopics);
        setMode('WELCOME');
      }} /></li>
    </>)
      ;
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      // 1) 새 항목 생성
      const newTopic = { id: nextId, title: _title, body: _body };

      // 2) topics에 추가(불변성 유지)
      //    - 배열 생성과 추가를 한 번에 표현
      const newTopics = [...topics, newTopic];
      setTopics(newTopics);

      // 3) nextId 증가
      setNextId(nextId + 1);

      // 4) 생성 직후 해당 글 읽기 화면으로 전환
      //    - UX 향상: 방금 만든 글을 바로 확인할 수 있도록
      setMode("READ");
      setId(newTopic.id);
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    // 현재 선택된 id에 해당하는 topic의 title/body를 찾음
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        break; // 찾았으면 루프 종료 (불필요한 반복 방지)
      }
    }

    content =
      <Update
        title={title}  // 찾은 title 값을 Update 컴포넌트에 전달
        body={body}    // 찾은 body 값을 Update 컴포넌트에 전달
        onUpdate={(title, body) => {
          // topics 배열 복사 (불변성 유지)
          const newTopics = [...topics];

          // 수정된 내용을 반영할 새 객체 생성
          const updatedTopic = { id: id, title: title, body: body };

          // 동일 id를 가진 topic을 찾아 교체
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break; // 찾았으면 루프 종료
            }
          }

          // state 업데이트: 새로운 topics로 교체
          setTopics(newTopics);

          // 수정 후 해당 글을 읽기 모드로 전환
          setMode('READ');
        }}
      ></Update>;
  }

  return (
    <div className='App'>
      {/* 헤더: 클릭 시 WELCOME으로 */}
      <Header title="WEB" onChangeMode={() => {
        setMode("WELCOME");
      }}></Header>

      {/* 네비: 항목 클릭 시 READ로 전환 + 해당 id 설정 */}
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode("READ");
        setId(_id);
      }}></Nav>

      {/* 본문(Welcome/Read/Create/Update 중 하나) */}
      {content}

      {/* 생성 링크: 클릭 시 CREATE 모드로 */}
      <a href='/create' onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
      {contextControl}
    </div>
  );
}

export default App;