import styled from "styled-components"

export const SMain = styled.main<any>`
  width: 100%;
  height: 100%;
  /* background-color: #d7bede; */
  background-color: #4e126b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #title {
    font-size: 80px;
    font-family: "Niconne";
    color: #ffffff;
    text-align: center;
    margin: 0;
    text-shadow: #805f89 5px 4px 2px;
  }
  #sub-title {
    margin: 0;
    padding: 0;
    color: #d7bede;
    letter-spacing: 4px;
    position: relative;
    overflow: hidden;

    background: linear-gradient(90deg, #7f18c9, #fff, #8f4fcc);
    background-repeat: no-repeat;
    background-size: 90%;
    animation: animate 6s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
    /* &:after {
      content: "";
      position: absolute;
      left: 120%;
      width: 120%;
      height: 100%;
      background: linear-gradient(90deg, transparent, #4e126b 5%);
      animation: animate 3s linear;
    } */
  }

  /* @keyframes animate {
    0%,
    100% {
      left: -20%;
    }
    100% {
      left: 100%;
    }
  } */

  @keyframes animate {
    0% {
      background-position: -1000%;
    }
    100% {
      background-position: 1000%;
    }
  }

  .btn__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    z-index: 100000;
    /* transition: all linear 300ms; */
  }
  .btn {
    width: 291.92px;
    height: 57px;
    background: rgba(255, 255, 255, 0.7);
    border: 3px solid #ffffff;
    box-shadow: #ffffff 0px 0px 7px 2px;
    /* filter: blur(4px); */
    border-radius: 30px;

    font-family: "S-CoreDream-7ExtraBold";
    font-size: 20px;
    color: #612fab;
  }
  .btn__wrapper:hover {
    /* transform: scale(1.02); */
    background: rgba(196, 120, 255, 0.7);
    border-radius: 30px;
  }

  .snow-container {
    display: flex;
    justify-content: space-between;
  }
  .snow-flake {
    color: $dano-coral;
    animation: fall 3.5s linear infinite;
  }
  @keyframes fall {
    0% {
      opacity: 0;
    }
    3% {
      opacity: 0.9;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      transform: translate(0, 70px);
      opacity: 0;
    }
  }
`
