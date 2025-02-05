import React from "react";
import { Switch, Route } from "react-router-dom";
import "./css/App.css";
import "./css/CoursePage.css";
import PageCourse from "./Component/PageCourse/PageCourse.js";
import PageCourseMod from "./Component/PageAdmin/PageCourseMod.js";
import PageLoginRegister from "./Component/PageLoginRegister.js";
import PageQuiz from "./Component/PageQuiz/PageQuiz.js";
import TenseMap from "./Component/PageMap/TenseMap.js";
import CondMap from "./Component/PageMap/CondMap.js";
import FutureMap from "./Component/PageMap/FutureMap.js";
import ModEdMap from "./Component/PageMap/ModEdMap.js";
import ModMap from "./Component/PageMap/ModMap.js";
import Home from "./Component/Home.js";
import Navbar from "./Component/Navbar";
import PageQuestionMod from "./Component/PageAdmin/PageQuestionMod.js";
import PageCreatePassword from "./Component/PageCreatePassword.js";
import PageNotepad from "./Component/PageNotePad/PageNotepad.js";
import PageProfessor from "./Component/PageProfessor/PageProfessor.js";

import ModalDefinition from "./Component/ModalDefinition.js";
import { ModalContext } from "./Contexts/ModalContext.js";
import axios from "axios";

class App extends React.Component {
  static contextType = ModalContext;

  constructor(props) {
    super(props);

    this.state = {
      word: "",
      definition: [],
    };
  }

  componentDidMount() {
    const body = document.body;
    const { setOpen } = this.context;

    body.addEventListener("dblclick", (e) => {
      console.log(window.getSelection().toString());
      const word = window.getSelection().toString();
      if (word.length === 0) return;
      axios
        .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then((response) => {
          console.log(response.data);
          setOpen();
          this.setState({ word: word, definition: response.data });
        })
        .catch((err) => {
          console.error("Error fetching word definition:", err);
        });

      const token = localStorage.getItem("jstoken");
      if (token !== "") {
        axios
          .post(
            "https://syntaxmap-back-p4ve.onrender.com/dictionnary",
            {
              word: word,
              session_name: localStorage.getItem("session"),
            },
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: token,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.error("Error posting word to dictionary:", err);
          });
      }
    });

    if (
      !localStorage.getItem("upload") ||
      localStorage.getItem("upload").length === 0
    ) {
      var emptyUploadJson = { upload: [] };
      var emptyDictionnaryJson = { word: [] };
      localStorage.setItem("jstoken", "");
      localStorage.setItem("refresh-jstoken", "");
      localStorage.setItem("session", "");
      localStorage.setItem("upload", JSON.stringify(emptyUploadJson));
      localStorage.setItem("dictionnary", JSON.stringify(emptyDictionnaryJson));
    }
  }

  render() {
    return (
      <div className="App">
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/addquestion" component={PageQuestionMod} />
          <Route path="/admincourse" component={PageCourseMod} />

          <Route path="/professor" component={PageProfessor} />

          <Route path="/notepad" component={PageNotepad} />

          <Route path="/confirmation/:token" component={PageCreatePassword} />
          <Route path="/confirmation/" component={PageCreatePassword} />
          <Route
            path="/passwordforgotten/:token"
            component={PageCreatePassword}
          />

          <Route exact path="/login_register" component={PageLoginRegister} />

          <Route exact path="/tensemap" component={TenseMap} />
          <Route exact path="/map/cond" component={CondMap} />
          <Route exact path="/map/future" component={FutureMap} />
          <Route exact path="/map/mod" component={ModMap} />
          <Route exact path="/map/mod past" component={ModEdMap} />
          <Route exact path="/quiz" component={PageQuiz} />

          <Route exact path="/course/:title" component={PageCourse} />
          <Route exact path="/quiz/:course" component={PageQuiz} />
        </Switch>

        <ModalDefinition
          word={this.state.word}
          definition={this.state.definition}
        />
      </div>
    );
  }
}

export default App;
