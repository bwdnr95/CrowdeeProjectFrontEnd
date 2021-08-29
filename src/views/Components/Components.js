
import React, {useState, useEffect} from "react";

// nodejs library that concatenates classes
import Container from '@material-ui/core/Container'
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import ProductSection from "views/LandingPage/Sections/ProductSection.js";
import MenuLink from "components/Header/MenuLink";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [userNickName,setUserNickName] = useState(localStorage.getItem("nickName"))
  const [userToken,setUserToken] = useState(localStorage.getItem("token"))
  const [checkLogin,setCheckLogin] = useState(false);
  useEffect(() => {
    if(userToken){
      setCheckLogin(true)
    }
    
  }, [])
  return (
    <Container>
      <Header
        brand="Crowdee"
        leftLinks={<MenuLink/>}
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        checkLogin={checkLogin}
        userNickName={userNickName}
        changeColorOnScroll={{
          height: 347,
          color: "white",
        }}
        {...rest}
      />

      <div style={{position:'fixed', color:'transparent', height:'347px', backgroundColor:'white', width:'100%'}}>

      </div>
      <Parallax image={
        [require("assets/img/bg4.jpg").default,
        require("assets/img/bg2.jpg").default]}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Crowdee</h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <ProductSection/>
      </div>
      <Footer />
    </Container>
  );
}

