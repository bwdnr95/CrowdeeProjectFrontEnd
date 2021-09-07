import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignUpPage from "views/SignUpPage/SignUpPage.js";
import WritePage from "views/WritePage/WritePage";
import ViewPage from "views/ViewPage/ViewPage.js";
import AdminPage from "views/AdminPage/AdminPage";
import FundingAdmin from "views/AdminPage/components/FundingAdmin";
import BackerAdmin from "views/AdminPage/components/BackerAdmin";
import BackerView from "views/AdminPage/components/BackerView";
import CreatorView from "views/AdminPage/components/CreatorView";
import CreatorAdmin from "views/AdminPage/components/CreatorAdmin";
import CreatorNo from "views/AdminPage/components/CreatorNo";
import CreatorInspectionAdmin from "views/AdminPage/components/CreatorInspectionAdmin";
import FundingView from "views/AdminPage/components/FundingView";
import FundingInspectionAdmin from "views/AdminPage/components/FundingInspectionAdmin";
import FundingNo from "views/AdminPage/components/FundingNo";
import CreatorRegistrationPage from "views/CreatorPage/CreatorRegistrationPage"
import MenuPage from "views/MenuPage/MenuPage";
import CategoryPage from "views/CategoryPage/CategoryPage";
import ProjectStartPage from "views/WritePage/ProjectStartPage";
import MyPage from "views/MyPage/MyPage";
import SearchPage from "views/SearchPage/SearchPage";

var hist = createBrowserHistory();

// componentDidMount(){

//   if(localStorage.getItem("ACCESS_TOKEN")){
//    this.setState(localStorage.getItem("ACCESS_TOKEN"))
//   };
  
// }

// useEffect(() => {
 
  
// }, [])

ReactDOM.render(
  
    <Router history={hist}>
      
      <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/signUp" component={SignUpPage} />
      <Route path="/creator-signUp" component={CreatorRegistrationPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/admin-page" component={AdminPage} />
      <Route path="/admin-backer" component={BackerAdmin} />
      <Route path="/admin-creator" component={CreatorAdmin} />
      <Route path="/admin-funding" component={FundingAdmin} /> 
      <Route path="/admin-backerView" component={BackerView} /> 
      <Route path="/admin-creatorView" component={CreatorView} /> 
      <Route path="/admin-creator-inspection" component={CreatorInspectionAdmin} /> 
      <Route path="/admin-creatorNo" component={CreatorNo} /> 
      <Route path="/admin-fundingView" component={FundingView} /> 
      <Route path="/admin-funding-inspection" component={FundingInspectionAdmin} /> 
      <Route path="/admin-fundingNo" component={FundingNo} /> 
      <Route path="/view/:projectUrl" component={ViewPage}/>
      <Route path="/write-page/:manageUrl" component={WritePage} />
      {/* <Route path="/write-page/:manageUrl/:creatorId" component={WritePage} /> */}
      <Route path="/project-start" component={ProjectStartPage} />
      <Route path="/menu-page" component={MenuPage} />
      <Route path="/category/:menu" component={CategoryPage} />
      <Route path="/my" component={MyPage} />
      {/* <Route path="/my/:memberId" component={MyPage} /> */}
      <Route path="/search" component={SearchPage} />
      <Route exact path="/" component={Components} />

    </Switch>
  </Router>, 
  document.getElementById("root")
  
  
); 
